import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getCountryByName } from "../../redux/actions"
import S from "../SearchBar/SearchBar.module.css";

export default function SearchBar() {
    const dispatch = useDispatch();
    const [nameCountry, setNameCountry] = useState("");

    const handleInput = (e) => {
        e.preventDefault();
        setNameCountry(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(nameCountry);
        dispatch(getCountryByName(nameCountry));
    }

    return(
        <div className={S.search_container}>
            <input type="text" className={S.input_search} onChange={handleInput} placeholder="Name of country..."/>
            <button className={S.buton_search} onClick={handleSubmit}>
                Search
            </button>
        </div>
    )
}

//solucionar problema en el submit