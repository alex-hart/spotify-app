import React from 'react';

const Tile = (props) => {
    return (
        <div
            style={{
                height: `calc(90vw / ${props.rows})`,
                width: `calc(90vw / ${props.rows})`,
            }}
        >
            <img src={props.imageUrl} alt="Album artwork" />
        </div>
    );
};

export default Tile;
