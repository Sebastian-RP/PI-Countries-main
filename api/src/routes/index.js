const { Router } = require('express');
// Importar todos los routers;
const { Country, Activity } = require('../db');
const express = require('express');
const axios = require('axios');

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
    }

    return apiInfo;
};

const getFromDb = async() => {
    await getApiData();
    const data = await Country.findAll();
    return data;
};

//end-points
router.get("/countries" , async(req, res) => {
    const { name } = req.query;
    const myDB = await getFromDb();
    if (name) {
        const filteredCountry = myDB.filter(c => c.name.toLowerCase().includes(name.toLowerCase()));
        filteredCountry.length ? res.status(200).send(filteredCountry) : res.status(404).send("Country not found");
    }else{ 
        res.status(200).send(myDB);
    } 
});

router.get("/countries/:idCountry" , async(req, res) => {
    const { idCountry } = req.params;
    const myDB = await getFromDb();
    const countryDetails = myDB.filter(coun => coun.id.toLowerCase() === idCountry.toLowerCase());

    countryDetails.length ? res.status(200).send(countryDetails) : res.status(404).send("Country not found");
});

router.post("/activity", async(req, res) => {
    let {
        name,
        difficulty,
        duration,
        season,
        countries_id
    } = req.body

    let [activityX, created] = await Activity.findOrCreate({//creamos una fila en activity con estos datos
        where: {name: name},
        defaults: {
            name: name,
            difficulty: difficulty,
            duration: duration,
            season: season
        }
    });

    const countryAsso = await Country.findAll( { where: {id: countries_id} } );

    for (let value of countryAsso) {
        await value.addActivity(activityX.dataValues.id);
    }

    res.status(200).send("activity created succesfully");
});

router.use(express.json());
module.exports = router;

