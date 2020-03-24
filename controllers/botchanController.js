var Book = require('../models/book');
var Chapter = require('../models/chapter');

const japaneseBookId = '5e7a3f72fa1a1f26ad184c94';
const englishBookId = '5e7a3f72fa1a1f26ad184c93';

exports.index = function(req, res) {
    res.render('index', { 'title': 'Botchan'})
}

exports.page = function(req, res) {
    Chapter.find({'position': req.params.page})
    .select('contents')
    .exec(function(err, chapters) {
        if (err) {
            console.log(err);
            return;
        }
        let next = req.params.page;
        next = parseInt(next) + 1;
        let prev = req.params.page;
        prev = parseInt(prev) - 1;
        console.log(chapters[0].contents);
        res.render('page', { 'eng': chapters[0].contents, 'jp': chapters[1].contents, 'prev': prev , 'next': next});
    })  
}