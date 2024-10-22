import React from 'react';
import TurkeyMap from 'turkey-map-react';
import {setCityName} from "../redux/weatherSlice.jsx";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

const MapSelection = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <div>
            <TurkeyMap
                // viewBox={ 0 , 80, 1500 , 750}
                onClick={ ({ plateNumber, name }) => {
                    dispatch(setCityName(name));
                    navigate('/weather');
                }}
            />
        </div>
    );
};

export default MapSelection;
