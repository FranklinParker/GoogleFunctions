const { Contact } = require('../models/contact').contactDB;


/**
 * Get all contacts
 *
 *
 * @returns {Promise<{success: boolean, error: *}>}
 */
const getContacts =  async () =>{
    try{
        const records = await Contact.findAll({
            //attributes: ['firstName','lastNaem', 'email']
        })
            .then(result=>{
                const records = [];
                result.forEach((record) => {
                    records.push(record.dataValues);
                });
                return records;
            });
        return {success: true, records: records};;

    } catch(err){
        return {success: false, error: err};
    }

}

module.exports = {
    getContacts

}