import React from 'react';
import Tile from './Tile';
import './css/Grid.css';

const checkUniqueAlbum = (albums, albumArtStore) => {
    albums.map((song) => {
        const albumArtUrl = song.track.album.images[1].url;
        if (albumArtStore.includes(albumArtUrl) === false) {
            //unique album -- update list and collect its album art url
            albumArtStore.push(albumArtUrl);
        } else {
            return;
        }
    });
};

const Grid = (props) => {
    const square = Math.floor(Math.sqrt(props.playListImages.length));
    const maxImages = square * square;
    const albumArtStore = [];
    checkUniqueAlbum(props.playListImages, albumArtStore);

    const images = albumArtStore.map((albumUrl, index) => {
        if (index < maxImages) {
            return <Tile imageUrl={albumUrl} rows={square} key={albumUrl} />;
        } else {
            return;
        }
    });

    return (
        <div>
            <button
                className="back-btn"
                onClick={() => {
                    props.clearImages();
                }}
            >
                ← Go Back
            </button>
            <div className="grid">{images}</div>
        </div>
    );
};

export default Grid;
