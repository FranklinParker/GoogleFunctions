const ContactDB = require('../models/contact').contactDB;


const getContacts = (callback) => {
    ContactDB.findAllContacts()
        .then((result) => {
            const records = [];
            result.forEach((record) => {
                records.push(record.dataValues);
            });
            console.log('records', records);
            callback({success: true, records: records});
        }).catch(err => {
        callback({success: false, error: err});
    });

}

module.exports = {
    getContacts
}