import React from "react";
import S from "../Loading/Loading.module.css";

export default function Loading(){
    return(
        <div className={S.loading_container}>
            <img src="https://bestanimations.com/media/earth-globes/1522627619globe-earth-animation-4.gif" alt="imagen de planeta"/>
            <h2>Loading...</h2>
        </div>
    )
}