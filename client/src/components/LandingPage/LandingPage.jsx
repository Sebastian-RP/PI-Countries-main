import React from "react";
import { Link } from "react-router-dom";
import S from "../LandingPage/LandingPage.module.css";

function LandingPage() {
    return(
        <div className={S.main_container}>
            <div className={S.elements_container}>
                <div className={S.text_container}>
                    <h1>Country web application</h1>   
                    <p>Obtain information from different countries while you learn about their tourist activities or add some, for those interested in visiting them</p>
                </div>
                <Link to="/home">
                    <button className={S.button_home}>
                        <span>Home</span>
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default LandingPage;