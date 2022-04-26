const { Router } = require('express');
// Importar todos los routers;
const { Country, Activity } = require('../db');
const express = require('express');
const axios = require('axios')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const urlAPI = `https://restcountries.com/v3/all`; 

const getApiData = async() => {
    const apiData = await axios.get(urlAPI);
    const apiInfo = await apiData.data.map((country) => {
        let capitalName = "";
        if (!country.capital) {
            capitalName = "not found";
        }else{
            capitalName = country.capital[0]
        }

        return{
            id: country.cca3,
            name: country.name.common,
            img_flag: country.flags[0],
            continent: country.continents[0],
            capital: capitalName,
            subregion: country.subregion,
            area: country.area,
            population: country.population,
        }
    });

    for (const elem of apiInfo) {
        let [countryX, created] = await Country.findOrCreate({
            where: { id: elem.id },
            defaults: {
                id: elem.id,
                name: elem.name,
                img_flag: elem.img_flag,
                continent: elem.continent,
                capital: elem.capital,
                subregion: elem.subregion,
                area: elem.area,
                population: elem.population,
            }
        })
        // console.log("vamos -- ",created);
    }

    return apiInfo;
};

router.get("/" , async(req, res) => {
    const myData = await getApiData();
    console.log(myData);

    // res.status(200).send(myData.stringify)
    res.status(200).send(myData);
})

router.get("/test" , async(req, res) => {
    const myData = await getApiData();
    console.log(myData);

    // res.status(200).send(myData.stringify)
    res.status(200).send(myData);
})

router.get("/countries" , async(req, res) => {
    const myData = await getApiData();
    console.log(myData);

    // res.status(200).send(myData.stringify)
    res.status(200).send(myData);
})

router.use(express.json());
module.exports = router;
