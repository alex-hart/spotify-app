import React from 'react';
import './css/Playlist.css';

const Playlist = (props) => {
    const selectPlaylist = (id) => {
        console.log(id);
        props.onSelect(id);
    };

    return (
        <div className='playlist' onClick={() => selectPlaylist(props.id)}>
            <div className='image-wrapper'>
                <img src={props.image} />
            </div>
            <h4>{props.name}</h4>
        </div>
    );
};

export default Playlist;
