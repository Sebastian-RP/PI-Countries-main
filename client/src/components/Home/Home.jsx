import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import S from "../Home/Home.module.css";
import SearchBar from "../SearchBar/SearchBar";
import Card from "../Card/Card";
import ContinentFilter from "../Continentfilter/Continentfilter";
import ActivityFilter from "../ActivityFilter/ActivityFilter";
import Pagination from "../Pagination/Pagination";

import {
    getAllCountries, 
    getAllActivities,
    orderByName,
    orderByPopulation
} from "../../redux/actions"

function Home() {
    const dispatch = useDispatch();
    const allActivities = useSelector(state => state.allActivities);
    const countries = useSelector(state => state.countries)

    console.log(countries);

    // eslint-disable-next-line no-unused-vars
    const [update, setUpdate] = useState("");
    const [currentPage, setcurrentPage] = useState(1);
    const countriesPerPage = 10;
    const indexOfLastCountry = currentPage * countriesPerPage; //2 * 10 - 1 = 19
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage; //20 - 10 - 1= 9
    //si la pagina actual es 1 muestre los primeros nueve, si no muestre los siguientes 10
    let currentCountries;
    currentPage === 1 
        ? currentCountries = countries.slice(0, 9)
        : currentCountries = countries.slice(indexOfFirstCountry-1, indexOfLastCountry-1);

    const pagination = (pageNumber) => {
        setcurrentPage(pageNumber);
    }

    useEffect(() => {
        dispatch(getAllCountries());
        dispatch(getAllActivities());
    }, [dispatch]);

    const handleOrderByName = (e) => {
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setUpdate(e.target.value);
    };

    const handleOrderByPopulation = (e) => {
        e.preventDefault();
        dispatch(orderByPopulation(e.target.value));
        setUpdate(e.target.value);
    };

    console.log(currentCountries.length);

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

            <Pagination coutriesPerPage={countriesPerPage} allCountries={countries.length} pagination={pagination}/>

            <div>
                {
                    currentCountries.map((el) => {
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

export default Home;