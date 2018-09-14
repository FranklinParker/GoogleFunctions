const ContactService = require('./services/contactservice');
const cors = require('cors');
/**
 * method to get all contacts
 *
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const getAllContacts = async function (req, res) {
    try{
        const result = await  ContactService.getContacts();
        res.status(200).send(result);
    } catch(err){
        res.status(200).send({success:false, error: err});
    }

};

// CORS and Cloud Functions export logic
exports.getContacts = async function getContacts(req, res) {
    console.log('in get Contacts');
    var corsFn = cors();
    corsFn(req, res, function () {
        console.log('in corsfn');
        getAllContacts(req, res);
    });
}
