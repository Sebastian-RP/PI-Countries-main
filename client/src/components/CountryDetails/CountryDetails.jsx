import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getByID } from "../../redux/actions";
import { Link } from "react-router-dom";
import S from "../CountryDetails/CountryDetails.module.css"
import Loading from "../Loading/Loading";

export default function CountryDetails() {
  const dispatch = useDispatch();
  let { id } = useParams();

  useEffect(() => {
    dispatch(getByID(id));
  }, [dispatch, id]);

  let details = useSelector((state) => state.details);
  console.log("andaamos ruleta");
  console.log(details);

  const handleReset = () => {
    details = [];
    console.log(details);
  }

  return (
    <div className={S.global_container}>
        <div className={S.cotainer_link}>
          <Link to="/home" className={S.link_home}>
            <button className={S.detail_button_home} onClick={handleReset}>Go to home</button>
          </Link>
        </div>
        <div className={S.main_container}>
          {
            details[0] 
              ? 
              <div className={S.left_container}>
                <img src={details[0]?.img_flag} alt={details[0]?.img_flag}/>
                <h1>{details[0].name}</h1>
                <h4>Continent: {details[0].continent}</h4>
                <h4>Capital: {details[0].capital}</h4>
                <h4>Subregion: {details[0].subregion}</h4>
                <h4>Area: {details[0].area + " km2"}</h4>
                <h4>Population: {details[0].population}</h4>
                <h3>Id: {details[0].id}</h3>
              </div>
              : 
              <Loading />
          }
          <div className={S.right_container}>
              {
                details[0]?.activities.map(act => 
                  <div key={act.name} className={S.activity}>
                    <h2>{act.name}</h2>
                    <h4>difficulty: {act.difficulty}</h4>
                    <h4>duration: {act.duration} hours</h4>
                    <h4>season: {act.season}</h4>
                  </div>
                )
              }
          </div>
        </div>
    </div>
  );
}
