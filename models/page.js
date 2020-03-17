var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PageSchema = new Schema(
    {
        position: {type: Number, required: true},
        contents: [],
        book: {type: Schema.Types.ObjectId, ref: 'Book', required: true},
    }
)

module.exports = mongoose.model('Page', PageSchema)