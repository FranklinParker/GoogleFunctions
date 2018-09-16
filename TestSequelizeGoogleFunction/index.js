const ContactService = require('./services/contactservice');
const UserService = require('./services/userservice');
const cors = require('cors');
const {process} = require('./routing');


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
  const params = req.body;
  try {
    const result = await  process(url, params);
    res.status(200).send(result);
  } catch (err) {
    res.status(200).send({success: false, error: err});
  }

}

/**
 * Google function entry method
 *
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.processRequest = async (req, res) => {
  console.log('Contacts');
  var corsFn = cors();
  corsFn(req, res, function () {
    console.log('in corsfn');
    routeRequest(req, res);
  });
}
