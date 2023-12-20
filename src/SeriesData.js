

import React from "react";
import axios from 'axios';
import { useState,useEffect } from "react";
import './Joke.css';
import './seriesData.css'

const SeriesData = () => {
	const [Test,setTest] = useState([]);
    const [Odi,setOdi] = useState([]);
    const [T20,setT20] = useState([]);
    const [selectedSeries, setSelectedSeries] = useState([]);
	const fetchApi = async() => {


        const options = {
        method: 'GET',
        url: 'https://cricket-live-data.p.rapidapi.com/series',
        headers: {
            'X-RapidAPI-Key': '147df97300msh5e9c39d1756c457p12b36fjsn59b7038301b5',
            'X-RapidAPI-Host': 'cricket-live-data.p.rapidapi.com'
        }
        };

        try {
            const response = await axios.request(options);
            console.log(response.data);
            setTest(response.data.results[0].series);
            setT20(response.data.results[1].series);
            setOdi(response.data.results[3].series);
        } 
        catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        // Call the API when the component mounts
        fetchApi();
    }, []);
	
    const handleButtonClick = (series) => {
        setSelectedSeries(series);
    };

    return (
        <div className="Test">
            <div className="buttonsContainer">
                <button className="odibutton" onClick={() => handleButtonClick(Odi)}>ODI</button>
                <button className="testbutton" onClick={() => handleButtonClick(Test)}>TEST</button>
                <button className="t20button" onClick={() => handleButtonClick(T20)}>T20</button>
            </div>    
            <div className="dataContainer">
                {selectedSeries.map((data) => (
                <p className="seriesName" key={data.series_id}>{data.series_name} {data.season}</p>
                ))}
            </div>        
            
        </div>
    );
	
}

export default SeriesData;
