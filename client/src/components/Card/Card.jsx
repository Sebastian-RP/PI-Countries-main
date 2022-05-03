import React from "react";
import S from "../Card/Card.module.css";

export default function Card({ imgFlag, nameCountry, continent }) {
    return(
        <div className={S.card_container}>
            <div className={S.image_container}>
                <img src={imgFlag} alt={`${nameCountry}`} className={S.flag_image}/>
            </div>
            <div className={S.text_container}>
                <h2>{nameCountry}</h2>
                <h2>{continent}</h2>
            </div>
        </div>
    )
}