// node --inspect-brk testterminal.js

if (!process.argv || !process.argv[2])
    console.log("run like this \"node test_getAuthToken.js ACCESSPOINTGTIN [PIN]\"");

const delay = require('delay');

const apiClass = require('./hm-cloud-api.js');
const api = new apiClass(process.argv[2], process.argv[3]);

console.log("------ test start --------");

(async () => {
    try {
        console.log("getHomematicHosts:");
        await api.getHomematicHosts();
        console.log("1st:");
        await api.auth1connectionRequest();
        console.log("2nd:");
        while (!await api.auth2isRequestAcknowledged()) {
            console.log("press blue button...");
            await delay(2000);
        }
        console.log("3rd:");
        await api.auth3requestAuthToken();
        
        console.log("config :")
        console.log(api.getSaveData());
    } catch (e) {
        console.error(e);
    }
})();

