import React from "react";
// import { useState } from "react";
import { useDispatch } from "react-redux";
import { filterByContinent } from "../../redux/actions"; 

export default function ContinentFilter() {
    
    const dispatch = useDispatch();

    const allContinents = ["Africa", "Antarctica", "Asia", "Europe", "Oceania", "North America", "South America"];

    const handleFilterByContinent = (e) => {
        e.preventDefault();
        dispatch(filterByContinent(e.target.value))
        console.log(e.target.value);
    }

    return (
        <select onChange={handleFilterByContinent}>
            <option value="" disabled defaultValue>
                Continents
            </option>
            <option value="All">All continents</option>
            {
                allContinents.map(continent => (
                    <option key={continent} value={continent}>{continent}</option>
                ))
            }
        </select>
    );
}
