const contactservice = require('./services/contactservice');
const userservice = require('./services/userservice');

const testContactGetAll = async ()=> {
    const result = await contactservice.getContacts();
    console.log('get contacts', result);
}

const testRegisterUser = async ()=>{
    const result = await userservice.register('jay','jeff','test8', 'test7pw');
    console.log('register result', result);
}

const testGetUsers  = async ()=> {
  const result = await userservice.getAllUsers();
  console.log('get users', result);
}
//testContactGetAll();
testGetUsers();
testRegisterUser();