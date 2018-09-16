const _ = require('lodash');


const processContact = (params)=> {
  return {success: true, message: ' processContact'};

}


const checkAuthIfRequired = (params, authMethod)=>{
  if(!authMethod){
    return;
  }
  try{
    authMethod(params);
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


const processMap = {
  'contacts': {
    authMethod: authMethod,
    method: processContact,
    email: 'student@gmail.com',
    // ADMIN user (password is Password10) can read all lessons and also can login on behalf of other users
    passwordDigest: '$argon2i$v=19$m=4096,t=3,p=1$vfrhde0OMBNSSE9rRWtVrQ$gBaNgJFPBZfzuvrzfX8iSr2+OCD8K8Iu/JjwpYp8/TY',
    roles: ['STUDENT']
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
    checkAuthIfRequired(params,processObject.authMethod);
    return processObject.method(params);
  }catch (e){
    return { success: false, message: e.message};
  }


}

const result = process('contacts', {
  user: 'joe'
});

console.log('result', result);



