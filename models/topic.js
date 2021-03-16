const commons = require('../commons/util');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const auditSchema = require('./auditable');

const schema = {
    name: { type: String, required: true } ,
    subscribers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subscriber' }]

};

const topicSchema = new Schema (commons.appendToObject(schema,auditSchema));

module.exports = mongoose.model('Topic', topicSchema);
