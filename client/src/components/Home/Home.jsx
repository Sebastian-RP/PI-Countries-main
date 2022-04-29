import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import S from "../Home/Home.module.css";
import SearchBar from "../SearchBar/SearchBar";
import Card from "../Card/Card";
import ContinentFilter from "../Continentfilter/Continentfilter";
import ActivityFilter from "../ActivityFilter/ActivityFilter";

import {
    getAllCountries, 
    getAllActivities,
    orderByName,
    orderByPopulation
} from "../../redux/actions"

function LandingPage() {
    const dispatch = useDispatch();
    // const allCountries = useSelector(state => state.allCountries);
    const allActivities = useSelector(state => state.allActivities);
    const countries = useSelector(state => state.countries)

    console.log(countries);

    // eslint-disable-next-line no-unused-vars
    const [orden, setOrden] = useState("");

    useEffect(() => {
        dispatch(getAllCountries());
        dispatch(getAllActivities());
    }, [dispatch]);

    const handleOrderByName = (e) => {
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setOrden(e.target.value);
    };

    const handleOrderByPopulation = (e) => {
        e.preventDefault();
        dispatch(orderByPopulation(e.target.value));
        setOrden(e.target.value);
    };

    return(
        <div>
            <SearchBar />
            <div className={S.container_filters}>

                <select onChange={handleOrderByName}>
                    <option disabled defaultValue selected>Alphabetical</option>
                    <option value="A-Z">A - Z</option>
                    <option value="Z-A">Z - A</option>
                </select>

                <select onChange={handleOrderByPopulation}>
                    <option disabled defaultValue selected>Population</option>
                    <option value="max-p">max population</option>
                    <option value="min-p">min population</option>
                </select>

                <ContinentFilter />

                <ActivityFilter allActivities={allActivities} />

                <Link to="/add-activity">
                    <button>new activity</button>
                </Link>

            </div>
            <h1>andamos piola en el home</h1>

            <div>
                {
                    countries.map((el) => {
                        return(
                            <div key={el.id}>
                                <Link to={`/country-detail/${el.id}`}>
                                    {
                                        <Card key={el.id} imgFlag={el.img_flag} nameCountry={el.name} continent={el.continent}/>
                                    }
                                </Link>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default LandingPage;