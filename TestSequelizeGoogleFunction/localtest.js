const {process} = require('./routing');


const testRouting = async (key, params) => {
    const result = await process(key, params);
    return result;

}
const  getLogin = async () =>{
    const result =  await  testRouting('/auth', {
        body: {
            email: "username3",
            password: "testtest"
        },
        query:{ $method: 'POST'},
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


const  testUpdateContact = async () =>{
    const result =  await  getLogin();

    const contactResult = await testRouting('/contacts', {
        body: {
            id: 8,
            firstName: "Updated",
            lastName: "Name",

        },
        query:{ $method: 'PUT'},
        headers: {
            'x-auth': result.token
        }
    });
    console.log(' contact udpdated', contactResult);

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




const methodsToTest = [testUpdateContact];


methodsToTest.forEach(method=> method());