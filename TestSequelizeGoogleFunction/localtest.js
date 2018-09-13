const contactservice = require('./services/contactservice');

const testContactGetAll = async ()=> {
    const result = await contactservice.getContacts();
    console.log('get contacts', result);
}
testContactGetAll();
