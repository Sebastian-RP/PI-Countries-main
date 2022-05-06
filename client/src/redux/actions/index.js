import axios from "axios";
import imageError404 from "../../components/Home/images/not-found-404.png";
const urlApi = "http://localhost:3001";

export function getAllCountries() {
    return async function(dispatch) {
        let json = await axios.get(`${urlApi}/countries`);
        console.log("action");
        console.log(json);
        console.log("------");
        return dispatch({
            type: "GET_ALL_COUNTRIES",
            payload: json.data
        });
    }
};

export function getAllActivities() {
    return async function(dispatch) {
        let json = await axios.get(`${urlApi}/activity`);
        return dispatch({
            type: "GET_ALL_ACTIVITIES",
            payload: json.data,
        })
    }
}

export function getCountryByName(name) {
    return async function(dispatch) {
        try {
            let json = await axios.get(`${urlApi}/countries?name=${name}`);
            return dispatch({
                type: "GET_COUNTRY_BY_NAME",
                payload: json.data,
            })
        } catch (error) {
            // console.log(error);
            return dispatch({
                type: "GET_COUNTRY_BY_NAME",
                payload: [{id: "error404", name: "COUNTRY DON'T FOUND", img_flag: imageError404}],
            })
        }
    }
}

export function getByID(idCountry) {
    return async function(dispatch) {
        try {
            let json = await axios.get(`${urlApi}/countries/${idCountry}`);
            return dispatch({
                type: "GET_COUNTRY_BY_ID",
                payload: json.data,
            });
        } catch (error) {
            console.log(error);
        }
    }
}

export function resetDetailById() {
    return{
        type: "RESET_DETAIL_BY_ID",
        payload: [],
    }
}

export function orderByName(order) {
    return{
        type: "ORDER_BY_NAME",
        payload: order
    }
};

export function orderByPopulation(order) {
    return{
        type: "ORDER_BY_POPULATION",
        payload: order,
    }
}

export function filterByContinent(continentName) {
    return{
        type: "FILTER_BY_CONTINENT",
        payload: continentName
    }
}

export function filterByActivity(activity) {
    return{
        type: "FILTER_BY_ACTIVITY",
        payload: activity
    }
}

export const postActivity = (payload) => {
    return async function() {
        const res = await axios.post("http://localhost:3001/activity", payload);
        return res;
    //   return response.data;
    };
  };