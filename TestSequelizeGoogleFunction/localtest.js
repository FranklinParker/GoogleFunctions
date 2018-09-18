const {process} = require('./routing');


const testRouting = async (key, params) => {
    const result = await process(key, params);
    return result;

}
const  getLogin = async () =>{
    const result =  await  testRouting('/login', {
        body: {
            email: "username3",
            password: "testtest"
        }
    });
    return result;

}

const  testGetContacts = async () =>{
    const result =  await getLogin();

    const contactResult = await testRouting('/getContacts', {

        headers: {
            'x-auth':  result.token
        }
    });
    console.log('getcontacts', contactResult);

}


const  testCreateContact = async () =>{
    const result =  await  getLogin();

    const contactResult = await testRouting('/addContact', {
        body: {
            email: "jj@mail.com",
            firstName: "Jack",
            lastName: "Jones",
            address: '1 main st',
            city: 'new york',
            state: 'NY',
            zip: '10029'
        },
        headers: {
            'x-auth': result.token
        }
    });
    console.log(' contact created', contactResult);

}



const methodsToTest = [testGetContacts];


methodsToTest.forEach(method=> method());