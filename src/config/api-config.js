let   backendHost;
const apiVersion = 'v2';
const hostname   = window && window.location && window.location.hostname;

if (hostname === 'realsite.com') {
    backendHost = 'https://api.realsite.com';
} else if (hostname === 'staging.realsite.com') {
    backendHost = 'https://staging.api.realsite.com';
} else if (/^qa/.test(hostname)) {
    backendHost = `https://api.${hostname}`;
} else {
    backendHost = process.env.REACT_APP_BACKEND_HOST || 'http://localhost:8080';
}

export const API_ROOT = `${backendHost}/api/${apiVersion}`;