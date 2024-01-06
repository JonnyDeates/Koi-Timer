import cors from "cors";
import config from "../config";


const allowedOrigins = config.NODE_ENV === 'development' ? ['http://localhost:5000']
    : ['http://koitimer.com', 'https://koitimer.com', 'http://www.koitimer.com', 'https://www.koitimer.com'];


const corsConfig = () => cors(
    {
        origin: function (origin, callback) {
            // allow requests with no origin - like mobile apps, curl, postman
            if (!origin) return callback(null, true);
            if (allowedOrigins.indexOf(origin) === -1) {
                const msg = 'The CORS policy for this site does not ' +
                    'allow access from the specified Origin.';
                return callback(new Error(msg), false);
            }
            return callback(null, true);
        },
        allowedHeaders: ["Content-Type", "Authorization"]
    }
);
export default corsConfig;