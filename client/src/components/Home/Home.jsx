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
    const lastIndex = currentPage * countriesPerPage; //2 * 10 - 1 = 19
    const firstIndex = lastIndex - countriesPerPage; //20 - 10 - 1= 9
    //si la pagina actual es 1 muestre los primeros nueve, si no muestre los siguientes 10
    let currentCountries;
    currentPage === 1 
        ? currentCountries = countries.slice(0, 9)
        : currentCountries = countries.slice(firstIndex-1, lastIndex-1);

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

    return(
        <div className={""}>
            <header>
                
                <Link to="/">
                    <div className={`${S.logo}`}>/</div> {/* logo del home */}
                </Link>

                <div className={S.container_left}>
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

                        <ActivityFilter allActivities={allActivities} />
                        
                        <ContinentFilter />
                    </div>
                </div>

                <div className={S.container_right}>
                        <Link to="/add-activity">
                            <button>new activity</button>
                        </Link>
                </div>
            </header>

            <hr />

            <div className={S.cards_pagination_container}>
                <div className={S.countries_container}>
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

                <Pagination className={S.pagination_container} coutriesPerPage={countriesPerPage} allCountries={countries.length} pagination={pagination}/>
            </div>
        </div>
    )
}

export default Home;