const commons = require('../commons/util');
const mongoose = require('mongoose');
const auditSchema = require('./auditable');

mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;

const schema = {
    url: { type: String, required: true }

};

const subscriberSchema = new Schema (commons.appendToObject(schema,auditSchema));

module.exports = mongoose.model('Subscriber', subscriberSchema);
