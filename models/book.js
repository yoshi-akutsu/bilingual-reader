var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BookSchema = new Schema(
    {
        title: {type: String, required: true, max: 100},
        author: {type: String, required: true, max: 100},
        chapters: [{type: Schema.Types.ObjectId, ref: 'Chapter'}],
    }
)

BookSchema.virtual('url')
.get(function () {
    return '/books/' + this._id;
});

module.exports = mongoose.model('Book', BookSchema)