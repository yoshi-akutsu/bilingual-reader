const book = require('../models/book');
const chapter = require('../models/chapter')

// Connect to MongoDB Atlas
var mongoose = require('mongoose');
var mongoDB = 'mongodb+srv://yoshiAdmin:tablet2020@cluster0-crx8m.mongodb.net/bilingual-reader?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var chapterIdArray = []

const japaneseBookId = '5e7a3f72fa1a1f26ad184c94';
const englishBookId = '5e7a3f72fa1a1f26ad184c93';

chapter.find({'language': 'Japanese'})
    .select('_id')
    .sort({ position: 1 })
    .exec(function(err, chapters) {
        if (err) {
            console.log(err);
            return;
        }
        for(let i = 0; i < chapters.length; i++) {
            chapterIdArray.push(chapters[i]._id)
        }
        book.findById(japaneseBookId, function(err, book){
            book.chapters = chapterIdArray;
            book.save(function(err){
                if(err) {
                    console.log(err);
                }
                else {
                    console.log('saved successfully');
                }
            })
        })
})