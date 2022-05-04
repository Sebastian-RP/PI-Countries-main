import React from "react";
import { useDispatch } from "react-redux";
import { filterByActivity } from "../../redux/actions"

export default function ActivityFilter({allActivities}) {

    const dispatch = useDispatch();

    const handleFilterByActivity = (e) => {
        e.preventDefault();
        dispatch(filterByActivity(e.target.value));
        console.log(e.target.value);
    }

    return(
        <select onChange={handleFilterByActivity}>
        <option value="" disabled defaultValue selected>
            Activities
        </option>
        {
            allActivities.map(act => 
                <option key={act.name} value={act.id}>{act.name}</option>    
            )
        }
        </select>
    )
}