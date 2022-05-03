import React, { useEffect, useState } from "react";
import S from "../Pagination/Pagination.module.css"

export default function Pagination({coutriesPerPage, allCountries, pagination}) {
    const pageNumbers =[];
    let gruopArrays = [];

    const [indexArray, setIndexArray] = useState(0)

    for (let i = 1; i <= Math.ceil(allCountries / coutriesPerPage); i++) { //cantidad de elementos totales, dividido limite de elementos por pagina
        pageNumbers.push(i);
    }

    if (pageNumbers[0]) {
        for (let i = 0; i < pageNumbers.length; i+=10) {
            gruopArrays = [...gruopArrays, pageNumbers.slice(i, i+10)] //gruopArrays = [[1,2,3], [4, 5, 6], [7,8,9]]
        } 
    }

    useEffect(() => {
        // console.log("si cambio de indice detecte el cambio");
    },[indexArray])

    const handleNextbutton = () => {
        setIndexArray((prevState) => prevState+1)
    };    

    const handleBeforeButton = () => {
        setIndexArray((prevState) => prevState-1)
    };    

    return(
        <nav className={S.pagination_nav}>
                {   //si no está en el primer grupo de paginas no me deje devolver
                    gruopArrays[0] && indexArray !== 0
                        ? <button className={S.button_go_pages} onClick={handleBeforeButton}>{"< "}prev</button>
                        : ""
                }
            <ul className={S.pagination_ul}>
                {
                    gruopArrays[0] && gruopArrays[indexArray].map(number => (
                        <li onClick={() => pagination(number)} key={number} className={S.pagination_li}>
                            <button type="button">
                                {number}
                            </button>
                        </li>
                    ))
                }
            </ul>
                {//si estoy en la ultima posicion de paginas no me muestre next
                    gruopArrays[0] && indexArray !== gruopArrays.length-1
                        ? <button className={S.button_go_pages} onClick={handleNextbutton}>next{" >"}</button>
                        : ""
                }
        </nav>
    )
}