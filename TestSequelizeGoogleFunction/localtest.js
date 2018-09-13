const contactservice = require('./services/contactservice');


contactservice.getContacts((results)=>{
    console.log('results', results);
})