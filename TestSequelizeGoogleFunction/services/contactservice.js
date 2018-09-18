const { Contact, insertNewContact,updateContactRecord } = require('../models/contact').contactDB;


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

/**
 * creates a new contact
 *
 *
 * @param contact
 */
const createNewContact = async (params)=>{
    try{
        const contact = params.body;
        const recordCount  = await insertNewContact(contact);
        return{  success: true, rowsUpdated: recordCount};
    }catch(e){
        return { success: false, message: e.message}
    }
}
/**
 * update contact
 *
 *
 * @param params
 * @returns {Promise<*>}
 */
const updateContact = async (params)=>{
    try{
        const contact = params.body;
        const result  = await updateContactRecord(contact);
        return{  success: true, result: result};
    }catch(e){
        return { success: false, message: e.message}
    }
}
module.exports = {
    getContacts,
    createNewContact,
    updateContact

}