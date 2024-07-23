import helmet from "helmet";
import config from "../config";

const helmetConfig = () => {
    return helmet({
        contentSecurityPolicy: {
            directives: {
                manifestSrc: 'self data:',
            }
        }
    })
};
export default helmetConfig;