const ContactService = require('./services/contactservice');
const UserService = require('./services/userservice');
const cors = require('cors');
const {process} = require('./routing');
const extend = Object.assign;

/**
 * makes a param bobject of from the request data
 *
 * @param req
 */
const getRequestData = (req)=> {
    const requestParams = {
        body: req.body || {},
        query: extend(extend({
                $method: req.method
            }, req.query || {}),
            req.params || {}),
        headers: req.headers
    }
    console.log('requestParams', requestParams);
    return requestParams;
}



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
  const requestDataParams = getRequestData(req);
  try {
    const result = await  process(url, requestDataParams);
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
