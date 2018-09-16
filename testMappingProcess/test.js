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
const register = (params)=>{
  return { success: true, message:'register worked'};
}

const processMap = {
  'contacts': {
    authMethods: [authMethod,authMethod2],
    processMethod: processContact
  },
  'register': {
   // authMethods: [authMethod,authMethod2],
    processMethod: register
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

const result2 = process('register', {

});
console.log('result2 register', result2);




