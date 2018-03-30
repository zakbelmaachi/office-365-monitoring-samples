import axios from 'axios';
const csv = require('csvtojson');

export class GraphUtilities {

    getMe(accessToken) {
        return new Promise((resolve, reject) => {
            fetch('https://graph.microsoft.com/v1.0/me', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Accept': 'application/json;odata.metadata=none'
                }
            }).then(response => {
                response.json()
                    .then(json => {
                        resolve(json);
                        return;
                    });
            }).catch(result => {
                console.log(result);
                reject(result);
                return;
            });
        })
    }

    getGraphReport(accessToken, report, period) {
        return new Promise((resolve, reject) => {
            fetch(`https://graph.microsoft.com/beta/reports/${report}(period='${period}')`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            }).then(response => {
                console.log("RESPONSE: --------------" + response)
                response.text().then(csvStr => {
                    let chunks = [];
                    
                    csv({noheader:false})
                    .fromString(csvStr)
                    .on('json',(json)=>{ //this func will be called 3 times
                        chunks.push(json);
                    })
                    .on('done',() => {
                        console.log('end json chunking')
                        resolve(chunks);
                    });
                });
            }).catch(result => {
                console.log(result);
                reject(result);
                return;
            });
        });
    }

    // alternative to using Fetch API
    getGraphReportAxios(accessToken, report, period) {
        return new Promise((resolve, reject) => {
            axios.get(`https://graph.microsoft.com/beta/reports/${report}(period='${period}')`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            }).then(response => {
                console.log("AXIOS RESPONSE");
                console.log(response)
                
                let chunks = [];
                
                csv({noheader:false})
                .fromString(response    )
                .on('json',(json)=>{ //this func will be called 3 times
                    chunks.push(json);
                })
                .on('done',() => {
                    console.log('end json chunking')
                    console.log(chunks);
                    resolve(chunks);
                });
            }).catch(result => {
                console.log(result);
                reject(result);
                return;
            });
        });
    }

    getAccessToken(authCtx, resource){
        return new Promise((resolve, reject) => {
          const accessToken = authCtx.getCachedToken(resource);
          if (accessToken) {
            resolve(accessToken);
            return;
          }
    
          if (authCtx.loginInProgress()) {
            reject('Login already in progress');
            return;
          }
    
          authCtx.acquireToken(resource, (error, token) => {
            if (error) {
              reject(error);
              return;
            }
    
            if (token) {
              resolve(token);
            }
            else {
              reject('Couldn\'t retrieve access token');
            }
          });
        });
      }
}

