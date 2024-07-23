if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const config = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT ? parseInt(process.env.PORT) : 5000,
};
export default config;
