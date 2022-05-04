import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllCountries, postActivity } from "../../redux/actions";
import S from "../FormAddActivity/FormAddActivity.module.css";

export default function FormAddActivity() {
    const dispatch = useDispatch();

    const [formValues, setFormValues] = useState({
        name: "",
        difficulty: "",
        duration: "",
        season: "",
        countries_id: [],
    });
    // al cargar el componente muestra los mensajes de error
    const [errorForm, setErrorForm] = useState({
        name: "this field is required",
        countries: "select at least one country",
    })

    const [enableButt, setEnableButt] = useState(true);

    

    useEffect(() => {
        if (errorForm.name.length > 0 || errorForm.countries.length > 0) {
            setEnableButt(true)
        }
        else{
            setEnableButt(false);
        }
    }, [errorForm])

    useEffect(() => {
        dispatch(getAllCountries());
    }, [dispatch]);

    useEffect(() => {
        if (formValues.countries_id.length < 1) {
            setErrorForm({
                ...errorForm,
                countries: "select at least one country"
            })
        }if (formValues.countries_id.length > 0) {
            setErrorForm({
                ...errorForm,
                countries: ""
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formValues.countries_id])

    const hours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    const validationform = (e) => {
        // validar que el campo de nombre sean letras y no este vacio
        if (e.target.name === "name") {
            if (e.target.value === "") {
                return(
                    setErrorForm({
                        ...errorForm,
                        name: "this field is required",
                    })
                )
            }
            if (!/^[A-Z]+$/i.test(e.target.value)) {
                return(
                    setErrorForm({
                    ...errorForm,
                    name: "only letters are allowed"
                }))
            }
            if (/^[A-Z]+$/i.test(e.target.value)) {
                return(
                    setErrorForm({
                        ...errorForm,
                        name: ""
                    })
                )
            }
        }
    }

    const handleChange = (e) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        })
        validationform(e);
    }

    //seleccionar pais
    const handleSelectCount = (e) => {
        setFormValues({
            ...formValues,
            countries_id: [...formValues.countries_id, e.target.value]
        })
        validationform(e);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(postActivity(formValues));
        alert("The new activity was added succesfully");
        setFormValues({
            name: "",
            difficulty: "",
            duration: "",
            season: "",
            countries_id: [],
        });
    }

    const handleDelete = (countryDelete) => {
        setFormValues({
            ...formValues,
            countries_id: formValues.countries_id.filter(count => count !== countryDelete)
        })
    }

    const allCountries = useSelector((state) => state.totalData)

    return(
        <div>
            <div className={S.link_container}>
                <Link to="/home">
                    <button className={S.button_home}>
                        <span>Home</span>
                    </button>
                </Link>
            </div>
            <div className={S.form_container}>
                <form action="" id="form" onSubmit={handleSubmit}>
                    
                    <div>
                        <input type="text" className={S.input_name} name="name" value={formValues.name} autoComplete="off" onChange={(e) => handleChange(e)} placeholder="Name..."/>

                        <div className={S.error_message}>{errorForm.name ? <h3>{errorForm.name}</h3> : <h3>{""}</h3>}</div>
                    </div>
                    
                        <div>
                            <label htmlFor="fDifficulty">Difficulty: </label>
                            <select name="difficulty" id="fDifficulty" onChange={(e) => handleChange(e)}>
                                <option value=""  disabled defaultValue selected>1 - 5</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="fDuration">Duration: </label>
                            <select name="duration" id="fDuration" onChange={(e) => handleChange(e)}>
                                <option value=""  disabled defaultValue selected>Hours</option>
                                {
                                    hours.map((h) => {
                                        return(
                                            <option key={h} value={h}>{h}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div>
                            <label htmlFor="fSeason">Season: </label>
                            <select id="fSeason" name="season" onChange={(e) => handleChange(e)}>
                                <option value="" disabled defaultValue selected>Select</option>
                                <option value="summer">summer</option>
                                <option value="autumn">autumn</option>
                                <option value="winter">winter</option>
                                <option value="spring">spring</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="fCountries">Activity: </label>
                            <select id="fCountries" className={S.activity_select} name="countries" onChange={(e) => handleSelectCount(e)}>
                                {
                                    allCountries.map(coun => {
                                        return(
                                            <option key={coun.id} value={coun.id}>{coun.name}</option>
                                        )
                                    })
                                }
                            </select>
                            <div className={S.error_message}>{errorForm.countries ? <h3>{errorForm.countries}</h3> : <h3>{""}</h3>}</div>
                        </div>

                        <div>
                            <button type="submit" className={S.button_create_activity} disabled={enableButt} form="form">Add new activity</button>
                        </div>

                    
                </form>
            </div>

            <div className={S.countries_selected}>
                <div className={S.title_countries}>
                    <h2>Countries</h2>
                </div>
                <ul className={S.ul_element}>
                    {
                        formValues.countries_id.map(el => 
                        <li key={el} onClick={() => handleDelete(el)}>
                            <p>{el}</p>
                        </li>    
                        )
                    }
                </ul>
            </div>
        </div>
    )
}