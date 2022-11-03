import axios from 'axios';

const KEY = 'AIzaSyBYxLQztj40zKc1bufG2259pi7z01jmD0k';

export default axios.create({
    baseURL: 'https://api.spotify.com/v1/search',
    params: {
        part: 'snippet',
        type: 'video',
        maxResults: 5,
        key: KEY,
    },
});
