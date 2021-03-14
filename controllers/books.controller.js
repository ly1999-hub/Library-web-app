const shortid = require("shortid");
var Book=require('../models/book.model');
var Session=require('../models/session.model');
module.exports.index = async (req, res) => {

  var sessionId = req.signedCookies.sessionId;
  var books=await Book.find();
  var session=await Session.findOne({ sessionId: sessionId });
  if( session.__v !== null){
    res.render("books/index", {
      books: books,
      numCart:session.__v
    });
  }
  res.render("books/index", {
    books: books,
  });

}

