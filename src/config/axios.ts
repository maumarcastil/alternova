import axios from 'axios';

const api = axios.create({
    baseURL: 'https://489a19f7-f7d2-426a-8361-230148034a79.mock.pstmn.io',
});

export default api;