var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ChapterSchema = new Schema(
    {
        position: {type: Number, required: true},
        contents: [],
        language: {type: String, required: true}
    }
)

module.exports = mongoose.model('Chapter', ChapterSchema)