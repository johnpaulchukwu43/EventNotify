const mongoose = require('mongoose');
const commons = require('../commons/util');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const auditSchema = require('./auditable');

const schema = {
    name: { type: String, required: true } ,
    topic: { type: mongoose.Schema.Types.ObjectId,
        ref: "Topic",
        required: true
    }
};

const messageSchema = new Schema (commons.appendToObject(schema,auditSchema));



module.exports = mongoose.model('Message', messageSchema);
