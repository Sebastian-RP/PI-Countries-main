import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getByID } from "../../redux/actions";
import { Link } from "react-router-dom";

export default function CountryDetails() {
  const dispatch = useDispatch();
  let { id } = useParams();

  useEffect(() => {
    dispatch(getByID(id));
  }, [dispatch, id]);

  const details = useSelector((state) => state.details);
  console.log(details);

  return (
    <div>
        <div className="left_container">
            <Link to="/home">
                <button>Go to home</button>
            </Link>
            <img src={details[0]?.img_flag} alt={details[0]?.name}/>
            <h2>{details[0]?.name}</h2>
            <h1>{details[0]?.id}</h1>
            <h2>{details[0]?.continent}</h2>
            <h2>{details[0]?.capital}</h2>
            <h2>{details[0]?.subregion}</h2>
            {/* agregar medida en km puede ser traido con un getter desde la bd */}
            <h2>{details[0] ? details[0].area + " Km2" : ""}</h2>
            <h2>{details[0]?.population}</h2>
        </div>
        <div className="right_container">
            {
              details[0]?.activities.map(act => 
                <div key={act}>
                  <hr />
                  <h4>{act.name}</h4>
                  <h4>{act.difficulty}</h4>
                  <h4>{act.duration}</h4>
                  <h4>{act.season}</h4>
                </div>
              )
            }
        </div>
    </div>
  );
}
