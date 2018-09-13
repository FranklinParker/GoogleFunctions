const { Contact, findAllContacts } = require('../models/contact').contactDB;



const getContacts = (callback) => {
    findAllContacts()
        .then((records) => {
            callback({success: true, records: records});
        }).catch(err => {
        callback({success: false, error: err});
    });

}

const getContactsFromDB = (callback) =>{
    Contact.findAll()
        .then(result=>{
            const records = [];
            result.forEach((record) => {
                records.push(record.dataValues);
            });
            callback({success: true, records: records});
        })
        .catch(err => {
            callback({success: false, error: err});
        });
}

module.exports = {
    getContacts
}