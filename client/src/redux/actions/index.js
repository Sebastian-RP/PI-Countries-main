import axios from "axios";
const urlApi = "http://localhost:3001";

export function getAllCountries() {
    return async function(dispatch) {
        let json = await axios.get(`${urlApi}/countries`);
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
            console.log(error);
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