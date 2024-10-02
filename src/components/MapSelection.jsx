import React from 'react';
import TurkeyMap from 'turkey-map-react';

const MapSelection = () => {

    return (
        <div>
            <TurkeyMap
                // viewBox={ 0 , 80, 1500 , 750}
                onClick={ ({ plateNumber, name }) => console.log("Cursor is over on " + plateNumber + " - " + name + "!") }
            />
        </div>
    );
};

export default MapSelection;
