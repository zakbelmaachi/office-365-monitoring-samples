const rp = require('request-promise');

module.exports = (context, req) => {
    context.log('JavaScript HTTP trigger function processed a request.');

    if (req.body && req.body.token) {

        let options = {
            uri: 'https://manage.office.com/api/v1.0/<REPLACE_WITH_YOUR_TENANT>/ServiceComms/CurrentStatus',
            // e.g. contoso.onmicrosoft.com
            headers: {
                'Authorization': 'Bearer ' + req.body.token,
                'Accept': 'application/json;odata.metadata=none'
            },
            json: true
        };

        rp(options)
            .then((response) => { 
                // pass response from Service Communications API through context.res.body
                context.res = {
                    status: 200,
                    body: response
                };
                context.done();
            })
            .catch((err) => {
                context.res = {
                    status: 500,
                    body: err
                };
                context.log(ctx.res.body);
                context.done();
            });
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass the appropriate access token in the request body"
        };
        context.done();
    }
    
};