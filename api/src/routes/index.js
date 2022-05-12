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
            // img_flag: country.flags[0],
            img_flag: country.flags[1],
            continent: country.continents[0],
            capital: capitalName,
            subregion: country.subregion,
            area: country.area,
            population: country.population,
        }
    });

    //precargamos todos los paises de la api a la base de datos
    for (const elem of apiInfo) {
        let [countryX, created] = await Country.findOrCreate({
            where: { id: elem.id }, //si el pais a ingresar no existe le agregamos los siguientes datos
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
    //relacion entre modelo Country y modelo Activity
    const data = await Country.findAll({
        attributes: { exclude: ['createdAt', 'updatedAt', 'country_activity']},
        include: {
            model: Activity,
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            through: {
                attributes: [],
            },
        }
    })
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

router.get("/countries/:idCountry", async(req, res) => {
    const { idCountry } = req.params;
    const myDB = await getFromDb();
    const countryDetails = myDB.filter(coun => coun.id.toLowerCase() === idCountry.toLowerCase());

    countryDetails.length ? res.status(200).send(countryDetails) : res.status(404).send("Country not found");
});

router.get("/activity", async(req, res) => {
    const getActivity = await Activity.findAll({
        attributes: ["name", "id"]
    });
    if (getActivity.length) {
        res.status(200).send(getActivity);   
    }else{
        res.json([{ 
            id: 000,
            name: "No hay actividades"
        }]);
    }
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

    const allDataCountries = await Country.findAll( { where: {id: countries_id} } );
    //contiene la info de los paises 

    for (let value of allDataCountries) {
        //values contiene el total de data de los paises
        await value.addActivity(activityX.dataValues.id);//fooInstance.addbar(); 
        //vinculo instancia del pais seleccionada a la tabla de actividad por medio del id de la tabla
    }
 
    res.status(200).send("activity created succesfully");
});

router.use(express.json());
module.exports = router;

