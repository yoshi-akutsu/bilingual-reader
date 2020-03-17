var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BookSchema = new Schema(
    {
        title: {type: String, required: true, max: 100},
        pages: [{type: Schema.Types.ObjectId, ref: 'Page'}],
        language: {type: String, required: true, max: 10}
    }
)

BookSchema.virtual('url')
.get(function () {
    return '/books/' + this._id;
});

module.exports = mongoose.model('Book', BookSchema)