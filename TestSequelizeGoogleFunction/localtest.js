const {process} = require('./routing');


const testRouting = async (key, params) => {
    const result = await process(key, params);
   // console.log(`${key} result ${JSON.stringify(result)}`);
    return result;

}

const  testLoginGetUser = async () =>{
    const result =  await  testRouting('/login', {
        body: {
            email: "username3",
            password: "testtest"
        }
    });

    const contactResult = await testRouting('/getContacts', {
        body: {
            email: "username3",
            firstName: "jill",
            lastName: "george",
            password: "testtest"
        },
        headers: {
            'x-auth': result.token
        }
    });
    console.log('getcontacts', contactResult);

}

testLoginGetUser();