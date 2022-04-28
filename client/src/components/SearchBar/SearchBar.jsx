import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getCountryByName } from "../../redux/actions"
// import S from "../SearchBar/SearchBar.module.css";

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
        <div>
            <input type="text" onChange={handleInput} placeholder="Search..."/>
            <button onClick={handleSubmit}>
                click here
            </button>
        </div>
    )
}

//solucionar problema en el submit