const adalConfig = {
    clientId: '<YOUR_APP_ID>',
    instance: 'https://login.microsoftonline.com/',
    endpoints: {
        'https://graph.microsoft.com': 'https://graph.microsoft.com',
        'https://manage.office.com': 'https://manage.office.com'
    },
    postLogoutRedirectUri: window.location.origin,
    cacheLocation: 'sessionStorage'
};

export default adalConfig;