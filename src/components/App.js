import React, { useState, useEffect } from 'react';
import Search from './Search';
import Grid from './Grid';
import Playlists from './Playlists';
import axios from 'axios';
import './css/App.css';
import logo from '../images/logo.png';
import { faker } from '@faker-js/faker';

// const playlists = [
//     { name: 'september', imageurl: faker.image.abstract(500, 500, true) },
//     { name: 'august', imageurl: faker.image.abstract(500, 500, true) },
//     { name: 'upbeat', imageurl: faker.image.abstract(500, 500, true) },
//     { name: 'favourites', imageurl: faker.image.abstract(500, 500, true) },
// ];

export default () => {
    const CLIENT_ID = '92a5c2f5232b41c3b8547c79cb8d12cd';
    const REDIRECT_URI = 'http://localhost:3000';
    const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
    const RESPONSE_TYPE = 'token';
    const [token, setToken] = useState('');
    const [playlistImages, setPlaylistImages] = useState([]);
    const [playlists, setPlaylists] = useState([]);
    const [playlistId, setPlaylistId] = useState('');

    useEffect(() => {
        const hash = window.location.hash;
        let token = window.localStorage.getItem('token');

        if (!token && hash) {
            token = hash
                .substring(1)
                .split('&')
                .find((elem) => elem.startsWith('access_token'))
                .split('=')[1];

            window.location.hash = '';
            window.localStorage.setItem('token', token);
        }

        setToken(token);

        const getPlaylists = async () => {
            const dataUser = await axios.get(
                `https://api.spotify.com/v1/me/playlists`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            ); // add logout on access token expired here?

            setPlaylists(dataUser.data.items);
        };

        console.log(playlistImages);

        getPlaylists();
    }, []);

    const logout = () => {
        setToken('');
        window.localStorage.removeItem('token');
    };

    const getPlaylist = async (playlistId) => {
        console.log('playlist selected', playlistId);
        const { data } = await axios.get(
            `https://api.spotify.com/v1/playlists/${playlistId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    fields: 'tracks.items.track.album.images',
                },
            }
        ); // add logout on access token expired here?

        setPlaylistImages(data.tracks.items);
    };

    const searchPlaylist = async (playlistLink) => {
        const playlistId = playlistLink.slice(34).split('?')[0];
        const { data } = await axios.get(
            `https://api.spotify.com/v1/playlists/${playlistId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    fields: 'tracks.items.track.album.images',
                },
            }
        ); // add logout on access token expired here?

        setPlaylistImages(data.tracks.items);
    };

    let content;

    return (
        <div className='container'>
            <header className='App-header'>
                <img className='logo' src={logo} />
                <h1>Playlist Mosaic Generator</h1>
            </header>

            {!token ? (
                <a
                    className='button'
                    href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
                >
                    Login to Spotify
                </a>
            ) : (
                <button className='button' onClick={logout}>
                    Logout
                </button>
            )}

            {!playlistImages.length ? (
                <div>
                    <Playlists playlists={playlists} onSelect={getPlaylist} />
                </div>
            ) : (
                <div>
                    <Grid
                        playListImages={playlistImages}
                        clearImages={() => {
                            setPlaylistImages([]);
                        }}
                    />
                </div>
            )}

            {/* // <div>
                //     <Search
                //         clientId={CLIENT_ID}
                //         onSubmit={searchPlaylist}
                //     />
                //
                //
                // </div> */}
        </div>
    );
};
