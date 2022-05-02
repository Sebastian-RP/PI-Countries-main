import React from "react";

export default function Pagination({coutriesPerPage, allCountries, pagination}) {
    const pageNumbers =[];

    for (let i = 1; i <= Math.ceil(allCountries / coutriesPerPage); i++) { //cantidad de elementos totales, dividido limite de elementos por pagina
        pageNumbers.push(i);
    }

    return(
        <nav>
            <ul>
                {
                    pageNumbers && pageNumbers.map(number => (
                        <li onClick={() => pagination(number)} key={number}>
                            <button type="button">
                                {number}
                            </button>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}