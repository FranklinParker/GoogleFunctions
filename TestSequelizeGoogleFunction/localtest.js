const contactservice = require('./services/contactservice');
const userservice = require('./services/userservice');
const { process} = require('./routing');

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

const testRouting =  async (key)=>{
  const result = await process('users', {});
  console.log(`${key} result ${JSON.stringify(result)}`);

}
//testContactGetAll();
//testGetUsers();
//testRegisterUser();
testRouting('users');

