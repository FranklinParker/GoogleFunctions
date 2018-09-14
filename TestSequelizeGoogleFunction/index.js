const ContactService = require('./services/contactservice');
const UserService = require('./services/userservice');
const cors = require('cors');
/**
 * register a user
 *
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const register = async function (req, res) {
    try{
        const {user, password }= req.body;
        console.log('user:' + user);
        console.log('password:' + password);
        const result = await  UserService.register(user,password);
        res.status(200).send(result);
    } catch(err){
        res.status(200).send({success:false, error: err});
    }

};

const getAllContacts = async function (req, res) {
    try{
        const result = await  ContactService.getContacts();
        res.status(200).send(result);
    } catch(err){
        res.status(200).send({success:false, error: err});
    }

};


/**
 * route
 *
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const routeRequest = async function (req, res) {
    const url = req.url;
    if(url==='getContacts'){
        getAllContacts(req,res);
    } else if(url==='register'){
        register(req, res);
    }else{
        res.status(401).send({ error: ' unknown route'});
    }


};


// CORS and Cloud Functions export logic
exports.processRequest = async (req, res)=> {
    console.log('Contacts');
    var corsFn = cors();
    corsFn(req, res, function () {
        console.log('in corsfn');
        routeRequest(req, res);
    });
}
