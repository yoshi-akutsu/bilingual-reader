#! /usr/bin/env node
const eng = require('../text/book.json');
const jp = require('../text/bookJp.json');

console.log('This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0-mbdj7.mongodb.net/local_library?retryWrites=true');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
// mongodb://127.0.0.1:27017/bilingual-reader
// mongodb+srv://yoshiAdmin:tablet2020@cluster0-crx8m.mongodb.net/bilingual-reader?retryWrites=true&w=majority


var async = require('async')
var Book = require('../models/book')
var Chapter = require('../models/chapter')

var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var books = []
var chapters = []

function bookCreate(title, author, chapters, cb) {
  bookdetail = { 
    title: title,
    author: author,
    chapters: chapters
  }    
  var book = new Book(bookdetail);    
  book.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Book: ' + book);
    books.push(book);
    cb(null, book);
  }  );
}

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
    console.log('New Chapter: ');
    chapters.push(chapter);
    // this is getting called too many times
  }  );
}


function createBooks(cb) {
    async.parallel([
        function(callback) {
          bookCreate('Botchan', 'Natusme Soseki', chapters[1], callback);
        },
        function(callback) {
          bookCreate('坊ちゃん', '礎石　夏目', chapters[0], callback);
        }
        ],
        // optional callback
        cb);
}

function createChapters(cb) {

  async.parallel(
    [
    function(callback) {
      // Iterates all chapters eng
      let counter = 1
      for (let i = 0; i < Object.keys(eng).length; i++) {
        let chapter = 'chapter' + counter;
        counter++;
        chapterCreate(i + 1, eng[chapter], 'English', callback);
      }
      return;
    },
      function(callback) {
        // Iterates all chapters jp
        let counter = 1
        for (let i = 0; i < Object.keys(jp).length; i++) {
          let chapter = 'chapter' + counter;
          counter++;
          chapterCreate(i + 1, jp[chapter], 'Japanese', callback);
        }
        return;
      }
    ],
      // optional callback
      cb);
}

async.series([
    createChapters,
    createBooks
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('done')
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
});




