import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllActivities, getAllCountries } from "../../redux/actions"

export default function Card({ imgFlag, nameCountry, continent }) {
    const dispatch = useDispatch();

    const [formValues, setFormValues] = useState({
        name: "",
        difficulty: "",
        duration: "",
        season: "",
        countries: [],
    });
    const [name, setName] = useState("");
    // const [updateName, setUpdateName] = useState("");

    useEffect(() => {
        dispatch(getAllActivities());
        dispatch(getAllCountries());
    }, [dispatch]);

    useEffect(() => {
        if (setFormValues.name) {
            console.log("ni modo");
        }
    }, []);

    const hours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    const handleChange = (e) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        })

        console.log(formValues);
    }

    const hanleSelectCount = (e) => {
        setFormValues({
            ...formValues,
            countries: [...formValues.countries, e.target.value]
        })
    }

    // eslint-disable-next-line no-unused-vars
    const allActivities = useSelector((state) => state.allActivities);
    const allCountries = useSelector((state) => state.totalData)

    return(
        <div>
            <h3>hola form</h3>
            <Link to="/home">
                <button>pal home bb</button>
            </Link>

            <form action="" id="form">
                
                <div>
                    <input type="text" name="name" value={formValues.name} autoComplete="off" onChange={(e) => handleChange(e)} placeholder="Name..."/>
                </div>
                <div ></div> {/*mesaje ed error de nombre*/}
                <div>
                    <div>
                        <label htmlFor="fDifficulty">Difficulty</label>
                        <select name="difficulty" id="fDifficulty" onChange={(e) => handleChange(e)}>
                            <option value=""  defaultValue>1 - 5</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="fDuration">Duration</label>
                        <select name="duration" id="fDuration" onChange={(e) => handleChange(e)}>
                            <option value=""  defaultValue>Hours</option>
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
                        <label htmlFor="fSeason">Season</label>
                        <select id="fSeason" name="season" onChange={(e) => handleChange(e)}>
                            <option value="">Select</option>
                            <option value="summer">summer</option>
                            <option value="autumn">autumn</option>
                            <option value="winter">winter</option>
                            <option value="spring">spring</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="fCountries">Activity</label>
                        <select id="fCountries" name="countries" onChange={hanleSelectCount}>
                            {
                                allCountries.map(coun => {
                                    return(
                                        <option key={coun.id} value={coun.id}>{coun.name}</option>
                                    )
                                })
                            }
                        </select>
                    </div>

                            {/* enfoque en el submit */}
                    <div>
                        <button type="submit" form="form">Add new activity</button>
                    </div>

                </div>
                

            </form>
        </div>
    )
}