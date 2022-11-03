import React from 'react';
import Tile from './Tile';
import './css/Grid.css';

const checkUniqueAlbum = (albums, albumArtStore) => {
    albums.forEach((song) => {
        const albumArtUrl = song.track.album.images[1].url;
        if (albumArtStore.includes(albumArtUrl) === false) {
            //unique album -- update list and collect its album art url
            albumArtStore.push(albumArtUrl);
        }
    });

    console.log(albumArtStore);
};

const Grid = (props) => {
    const square = Math.floor(Math.sqrt(props.playListImages.length));
    const maxImages = square * square;
    const albumArtStore = [];
    checkUniqueAlbum(props.playListImages, albumArtStore);

    albumArtStore.splice(
        albumArtStore.length - (albumArtStore.length - maxImages),
        albumArtStore.length - maxImages
    );

    const images = albumArtStore.map((albumUrl) => {
        return <Tile imageUrl={albumUrl} rows={square} key={albumUrl} />;
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
