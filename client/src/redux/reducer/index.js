const initialState = {
    totalData: [],
    countries: [],
    allCountries: [],
    allActivities: [],
    details: [],
    continets: [],
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_ALL_COUNTRIES":
            return{
              ...state,
              countries: action.payload,
              allCountries: action.payload,
              totalData: action.payload,
            }
        case "GET_ALL_ACTIVITIES":
            return{
                ...state,
                allActivities: action.payload,
            }
        case "GET_COUNTRY_BY_NAME":
            return{
                ...state,
                countries: action.payload,
            }
        case "GET_COUNTRY_BY_ID":
            return{
                ...state,
                details: action.payload,
            }
        case "RESET_DETAIL_BY_ID":
            return{
                ...state,
                details: action.payload
            }
        case "ORDER_BY_NAME":  
            console.log("reducer");
            console.log(action.payload);
            const sortedName = action.payload  === "A-Z"
                    ? state.allCountries.sort((a, b) => {
                        if (a.name > b.name) {
                            return 1;
                        }
                        if (b.name > a.name) {
                            return -1;
                        }
                        return 0;
                    })
                    :state.allCountries.sort((a, b) => {
                        if (a.name > b.name) {
                            return -1;
                        }
                        if (b.name > a.name) {
                            return 1;
                        }
                        return 0;
                    })
                    console.log(sortedName);
            return{ 
                ...state,
                countries: sortedName,
            };
        case "ORDER_BY_POPULATION":
            const sortedPopulation = action.payload === "min-p"
                ? state.allCountries.sort((a, b) => {
                    if (parseInt(a.population) > parseInt(b.population)) {
                        return 1;
                    }
                    if (parseInt(b.population) > parseInt(a.population)) {
                        return -1;
                    }
                    return 0;
                })
                : state.allCountries.sort((a, b) => {
                    if (parseInt(a.population) > parseInt(b.population)) {
                        return -1;
                    }
                    if (parseInt(b.population) > parseInt(a.population)) {
                        return 1;
                    }
                    return 0;
                })

            return{
                ...state,
                countries: sortedPopulation,
            }
            //se puede hacer que al ejecutarse la accion llame el valor total de paises
        case "FILTER_BY_CONTINENT": 
            let filterContinent; 
            if (action.payload === "All") {
                filterContinent = state.totalData;
                state.allCountries = state.totalData
            } else{
                filterContinent = state.totalData.filter(country => country.continent === action.payload);
            }
            return{
                ...state,
                countries: filterContinent,
                allCountries: filterContinent
            }
        case "FILTER_BY_ACTIVITY":
            //reset para mostrar todas las actividdes
            if (action.payload === "All") {
                return{
                    ...state,
                    countries: state.totalData
                }
            }
            //esto podria funcionar pero se debe parsear el action.payload
            // const filteredCount = state.allCountries.filter(count => count.activities.find(act => act.id === action.payload))
            const filteredCount = state.allCountries.filter(el => el.activities[0]);
            console.log(action.payload);
            let selectedCount = [];
            filteredCount.forEach(elem => {
                for (let i = 0; i < elem.activities.length; i++) {
                    if (elem.activities[i].id === parseInt(action.payload)) {
                        selectedCount.push(elem)
                    }
                }
            });
            return{
                ...state,
                countries: selectedCount
            }
        default:
            return state;
    }
};

export default rootReducer;