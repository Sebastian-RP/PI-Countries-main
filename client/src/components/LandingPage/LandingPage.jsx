import React from "react";
import { Link } from "react-router-dom";
import S from "../LandingPage/LandingPage.module.css";

function LandingPage() {
    return(
        <div className={S.main_container}>
            
            <Link to="/home">
                <button className={S.button_home}>Go home</button>
            </Link>
        </div>
    )
}

export default LandingPage;