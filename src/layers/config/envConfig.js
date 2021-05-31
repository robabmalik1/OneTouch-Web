import constants from "./constants";

const DEV = {
    ENV_NAME: constants.ENV_VARIABLES.DEV,
    API_URL: `https://onetouch-user.herokuapp.com`,
    FEEDS_API_URL: 'http://localhost:5050',
    PUBLISH_API_URL: 'http://localhost:5080',
};

const STAGE = {
    ENV_NAME: constants.ENV_VARIABLES.STAGE,
    API_URL: '',
    FEEDS_API_URL: ''
};

const PROD = {
    ENV_NAME: constants.ENV_VARIABLES.PROD,
    API_URL: '',
    FEEDS_API_URL: ''
};

function getEnvConfig() {
    let envConfig = DEV;
    let currentEnv = constants.ENV_VARIABLES.DEV;

    if (constants.ENV_VARIABLES.hasOwnProperty(`${process.env.REACT_APP_ENV}`)) {
        currentEnv = `${process.env.REACT_APP_ENV}`;
    }

    if (currentEnv === constants.ENV_VARIABLES.DEV) {
        envConfig = DEV;
    } else if (currentEnv === constants.ENV_VARIABLES.STAGE) {
        envConfig = STAGE;
    } else if (currentEnv === constants.ENV_VARIABLES.PROD) {
        envConfig = PROD;
    }

    return envConfig;
}

export const envConfig = getEnvConfig();