import React, {useState} from 'react';
import {Link, Outlet} from "react-router-dom";

function CitiesSelection() {
    const [choiceType, setChoiceType] = useState('')

    return(
        <div>
            <nav className="flex justify-center mt-8 mb-2">
                <Link to="map"
                      className={`px-6 py-2 rounded-l-full border-2 border-gray-300 ${choiceType === 'map' ? 'bg-blue-700 text-white' : 'bg-white text-blue-700'}`}
                      onClick={() => setChoiceType('map')}
                >
                    Map
                </Link>
                <Link to="cities"
                      className={`px-6 py-2 rounded-r-full border-2 border-gray-300 ${choiceType === 'cities' ? 'bg-blue-700 text-white' : 'bg-white text-blue-700'}`}
                      onClick={() => setChoiceType('cities')}
                >
                    Cities
                </Link>
            </nav>
            <Outlet/>
        </div>
    );
}
export default CitiesSelection;