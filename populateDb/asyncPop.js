// Imports json versions of English and Japanese book
const eng = require('../text/book.json');
const jp = require('../text/bookJp.json');

// Imports Book and Chapter models for saving to database
var Book = require('../models/book')
var Chapter = require('../models/chapter')

// Connect to MongoDB Atlas using mongoose
var mongoose = require('mongoose');

var mongoDB = 'mongodb+srv://yoshiAdmin:tablet2020@cluster0-crx8m.mongodb.net/bilingual-reader?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Creates arrays of books and chapters to iterate through and add to database
var books = [];
var chapters = [['test1'], ['test2']];

// Creates book documents
function bookCreate(title, author, chapters, cb) {
    bookdetail = { 
      title: title,
      author: author,
      chapters: chapters
    }
    // Makes new document type Book
    var book = new Book(bookdetail);
    // Async function that saves the book with correct params into the db   
    book.save(function (err) {
      if (err) {
        cb(err, null)
        return
      }
      console.log('New Book: ' + book);
      books.push(book);
      cb(null, book);
      return;
    }  );
  }

// Creates chapter documents
function chapterCreate(position, contents, language, cb) {
    chapterdetail = { 
      position: position,
      contents: contents,
      language: language
    }    
    var chapter = new Chapter(chapterdetail);    
    chapter.save(function (err) {
      if (err) {
        cb(err, null);
        return;
      }
      console.log('New Chapter: ' + chapter);
      chapters.push(chapter);
      cb(null, chapter);
      return;
    }  );
  }

function callback(a, b) {
    console.log(a);
    console.log(b)
}

bookCreate('Botchan', 'Natusme Soseki', chapters[1], callback);
bookCreate('坊ちゃん', '礎石　夏目', chapters[0], callback);


