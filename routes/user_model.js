var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var urlSchema = new Schema({
    original_url: {
        type: String,
        required: true,
        unique : true
    },
    short_url: {
        type: String,
        required: true,
        unique : true
    },short_url_id : {
        type : Number,
        unique : true,
        required : true
    }
});
var urls = mongoose.model('urls', urlSchema);
module.exports = urls;
