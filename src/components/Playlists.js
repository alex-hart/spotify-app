import React from 'react';
import Playlist from './Playlist';
import './css/Playlists.css';

const Playlists = (props) => {
    // console.log(props.playlists);
    const renderPlaylists = props.playlists.map((playlist) => {
        return (
            <Playlist
                name={playlist.name}
                image={playlist.images[0].url}
                key={playlist.id}
                id={playlist.id}
                onSelect={props.onSelect}
            />
        );
    });
    return <div className='playlists'>{renderPlaylists}</div>;
};

export default Playlists;
