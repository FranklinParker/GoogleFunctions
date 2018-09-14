const contactservice = require('./services/contactservice');
const userservice = require('./services/userservice');

const testContactGetAll = async ()=> {
    const result = await contactservice.getContacts();
    console.log('get contacts', result);
}

const testRegisterUser = async ()=>{
    const result = await userservice.register('test', 'test');
    console.log('register result', result);
}
testContactGetAll();

testRegisterUser();