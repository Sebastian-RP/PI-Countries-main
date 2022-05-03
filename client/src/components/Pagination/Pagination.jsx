import React from "react";
import S from "../Pagination/Pagination.module.css"

export default function Pagination({coutriesPerPage, allCountries, pagination}) {
    const pageNumbers =[];

    for (let i = 1; i <= Math.ceil(allCountries / coutriesPerPage); i++) { //cantidad de elementos totales, dividido limite de elementos por pagina
        pageNumbers.push(i);
    }

    return(
        <nav className={S.pagination_nav}>
            <ul className={S.pagination_ul}>
                {
                    pageNumbers && pageNumbers.map(number => (
                        <li onClick={() => pagination(number)} key={number} className={S.pagination_li}>
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