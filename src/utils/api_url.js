let API_BASE = 'http://localhost:3001';
if(process.env.NODE_ENV === 'production') {
    API_BASE = 'https://docmap-be.onrender.com';
}
export default API_BASE;