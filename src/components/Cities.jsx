import React from 'react';
import citiesData from '../data/cities.json'
import {useDispatch} from "react-redux";
import { setCityName } from '../redux/weatherSlice.jsx';
import {useNavigate} from "react-router-dom";

function Cities() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleButtonClick = (name) => {
        dispatch(setCityName(name));
        navigate('/weather');
    };

    return (
        <div>
            <div className="flex justify-center w-[100%] text-3xl">CİTİES</div>
            <div className="mt-2">
                {citiesData.map((city) => (
                    <button
                        key={city.id}
                        onClick={() => handleButtonClick(city.name)}
                        className="m-2"
                    >
                        {city.name}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default Cities;