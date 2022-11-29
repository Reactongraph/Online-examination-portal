import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

// extract - Env variables

const SERVER_LINK = publicRuntimeConfig.SERVER_LINK;



export {

    SERVER_LINK
}