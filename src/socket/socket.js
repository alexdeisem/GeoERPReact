import Echo from 'laravel-echo';

const pusher = require('pusher-js');
const token = localStorage.getItem('token');

const echo = new Echo({
    broadcaster: 'pusher',
    key: process.env.REACT_APP_PUSHER_KEY,
    cluster: process.env.REACT_APP_PUSHER_CLUSTER,
    wsHost: 'geoerp.api',
    wsPort: 6001,
    forceTLS: false,
    auth: {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
});

export { pusher, echo }