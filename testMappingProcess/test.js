const _ = require('lodash');


const processContact = (params)=> {
  return {success: true, message: ' processContact'};

}


const checkAuthIfRequired = (params, authMethods)=>{
  if(!authMethods){
    return;
  }
  try{

    authMethods.forEach(authMethod=>authMethod(params));
  }catch (e){
    throw e;
  }
}
const authMethod = (params) => {
  console.log('in auth method ', params)
  if(!params ||  params.user !=='joe'){
    throw new Error(' Auth failed');
  }
}

const authMethod2 = (params) => {
  console.log('in auth method2 ', params)
  if(!params ||  params.password !=='pw'){
    throw new Error(' Auth failed 2nd');
  }
}


const processMap = {
  'contacts': {
    authMethods: [authMethod,authMethod2],
    processMethod: processContact
  },
  'register': {
    id: 2,
    email: 'admin@gmail.com',
    // normal user (password is Password10), does not have access to login as another user functionality
    passwordDigest: '$argon2i$v=19$m=4096,t=3,p=1$vfrhde0OMBNSSE9rRWtVrQ$gBaNgJFPBZfzuvrzfX8iSr2+OCD8K8Iu/JjwpYp8/TY',
    roles: ['STUDENT', 'ADMIN']
  }
};




const process = (objectKey, params) =>{
  const processObject =  processMap[objectKey];
  let authFailed = false;
  try{
    checkAuthIfRequired(params,processObject.authMethods);
    return processObject.processMethod(params);
  }catch (e){
    return { success: false, message: e.message};
  }


}

const result = process('contacts', {
  user: 'joe',
  password: 'pw'
});

console.log('result', result);



