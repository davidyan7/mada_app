/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from "react";
import CitiesDataService from "../services/CitiesService";
import CitiesWasService from "../services/CitiesWasAlertService";
import {Search} from "./search";
import trashIcon from "../assets/trash.svg"

var cities = require('../services/citiesArchive.json')


const AddTutorial = () => {
    const initialTutorialState = {
        key: null,
        published: false,
        id: "",
        name: "",
        name_en: "",
        zone: "",
        zone_en: "",
        time: "",
        time_en: "",
        countdown: 0,
        lat: 0,
        lng: 0,
        value: ""
    };
    const [tutorial, setTutorial] = useState(initialTutorialState);
    const [submitted, setSubmitted] = useState(false);
    const [citiesToAlert, setcitiesToAlert] = useState([]);

    const handleMessageFromChild = (newCityToAlert) => {
        newCityToAlert.id = Math.random(100000000)
        // saveTutorial(newCityToAlert)
        setTimeout(() => {

        }, newCityToAlert.countdown * 1000);
        setcitiesToAlert([...citiesToAlert, newCityToAlert]);
    }
    const handleInputChange = event => {
        const {name, value} = event.target;
        setTutorial({...tutorial, [name]: value});
    };

    useEffect(() => {

    }, [citiesToAlert])


    const saveTutorial = (data) => {

        citiesToAlert.forEach(element => {
            setTimeout(() => {
                CitiesWasService.create(element)
            }, element.countdown * 1000);
            CitiesDataService.create(element)
                .then(() => {
                    setSubmitted(true);
                })
                .catch(e => {
                    console.log(e);
                });

        });
        setcitiesToAlert([])
    };


    const deleteCity = (city) => {
        const idx = citiesToAlert.findIndex(e => city.id === e.id)
        citiesToAlert.splice(idx, 1)
        setcitiesToAlert([...citiesToAlert])
    }

    return (
        <div className="about">
            <div className="main2">
                <Search citiesToAlert={handleMessageFromChild} data={cities} className="main1"/>
            </div>
            <div className="main1">
                <h2>רשימת ערים להפעלה</h2>
                <ul className="list-group">
                    {
                        citiesToAlert &&
                        citiesToAlert.map((city, index) => (
                            <li className="text-dark list-group-item"
                                key={index}>
                                <div style={{width: '100%'}} className="d-flex justify-content-between">
                                    <img className="ml-5 btn btn-light" onClick={() => deleteCity(city)}
                                         src={trashIcon} alt={"trash-icon"}></img>
                                    {city.name}
                                </div>

                                {/* tutorial.title */}
                            </li>
                        ))}
                    <button onClick={saveTutorial} className="btn btn-success ">
                        Submit
                    </button>
                </ul>
            </div>
        </div>
    );
};

export default AddTutorial;
