const contactservice = require('./services/contactservice');
const userservice = require('./services/userservice');
const {process} = require('./routing');

const testContactGetAll = async () => {
    const result = await contactservice.getContacts();
    console.log('get contacts', result);
}

const testRegisterUser = async () => {
    const result = await userservice.register('jay', 'jeff', 'test8', 'test7pw');
    console.log('register result', result);
}

const testGetUsers = async () => {
    const result = await userservice.getAllUsers();
    console.log('get users', result);
}

const testRouting = async (key, params) => {
    const result = await process(key, params);
    console.log(`${key} result ${JSON.stringify(result)}`);

}
//testContactGetAll();
//testGetUsers();
//testRegisterUser();
if(false) {
    testRouting('/register?name=test', {
        body: {
            email: "username3",
            firstName: "jill",
            lastName: "george",
            password: "testtest"
        },
        headers: {'x-auth': 'test1'}
    });
}

testRouting('/login', {
    body: {
        email: "username4",
        password: "testtest"
    }
});

