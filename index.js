const express = require("express");
var bodyParser = require("body-parser");

//database
const database = require("./database");

//initialize express
const booky = express();
booky.use(bodyParser.urlencoded({extended: true}));
booky.use(bodyParser.json());

/*
route           /
method          get
parameter       none
description     get all books
access          public
 */

booky.get("/",(req,res) => {
return res.json({books: database.books});
});

/*
route           /is
method          get
parameter       isbn
description     get specified books
access          public
 */

booky.get("/is/:isbn", (req,res) => {
    const getSpecificBook = database.books.filter(
        (books) => books.ISBN === req.params.isbn
    );

    if(getSpecificBook.length === 0){
        return res.json({error: `No book found for the ISBN of ${req.params.isbn}`});
    }

    return res.json({books: getSpecificBook});
});

/*
route           /c
method          get
parameter       category
description     get specific category books
access          public
 */

booky.get("/c/:category", (req,res)  => {
    const getSpecificBook = database.books.filter((book) => book.category.includes(req.params.category))

    if (getSpecificBook.length === 0){
        return res.json({error: `No book is found on the category of ${req.params.category}`})
    }
    return res.json({book: getSpecificBook});
    
});

/*
route           /l
method          get
parameter       language
description     get specific language books
access          public
 */

booky.get("/l/:language", (req,res) => {
    const getSpecificBook = database.books.filter((book) => book.language.includes(req.params.language))

    if(getSpecificBook.length === 0){
        return res.json({error: `no book found on the language ${req.params.language}`})
    }

    return res.json({book: getSpecificBook})
});

/*
route           /author
method          get
parameter       none
description     get author
access          public
 */

booky.get("/author", (req,res) => {
    return res.json({author: database.author});
});

/*
route           /author/books
method          get
parameter       isbn
description     get author based on the book
access          public
 */

booky.get("/author/book/:isbn", (req,res) => {
    const getSpecificAuthor = database.author.filter((author) => author.books.includes(req.params.isbn))

    if (getSpecificAuthor.length === 0){
        return res.json({error: `No author is found in the isbn of ${req.params.isbn}`})
    }

    return res.json({author: getSpecificAuthor})
});

/*
route           /author
method          get
parameter       idn
description     get author based on id
access          public
 */

booky.get("/author/:idn", (req,res) => {
    const getSpecificAuthor = database.author.filter((author) => author.id === parseInt(req.params.idn))

    if(getSpecificAuthor.length === 0){
        return res.json({error: `No author is found in the id of ${req.params.idn}`})
    }

    return res.json({author: getSpecificAuthor})
} );

/*
route           /publication
method          get
parameter       none
description     get all publication
access          public
 */

booky.get("/publication", (req,res) => {
    return res.json({publications: database.publication})
});

/*
route           /publication
method          get
parameter       id
description     get publicaion based on id
access          public
 */

booky.get("/publication/:id", (req,res) => {
    const getSpecificPublication = database.publication.filter((publication) => publication.id === parseInt(req.params.id));

    if(getSpecificPublication.length === 0){
        return res.json({error:`No publication is found on the id of ${req.params.id}`});
    }

    return res.json({publication: getSpecificPublication});
});

/*
route           /publication/book
method          get
parameter       books
description     get publicaion based on book
access          public
 */

booky.get("/publication/book/:books", (req,res) => {
    const getSpecificPublication =database.publication.filter((publication)=> publication.books.includes(req.params.books));

if(getSpecificPublication.length === 0){
    return res.json({error: `No publication is found based on the book of ${req.params.books}`});
}

return res.json({publication: getSpecificPublication});
})

/*
route           /book/new
method          post
parameter       none
description     add new book
access          public
 */

booky.post("/book/new",(req,res)=> {
const newBook = req.body;
const preData = database.books.filter((book) => book.ISBN === newBook.ISBN)
if(preData.length === 0) {
    database.books.push(newBook);
  return res.json({updatedbooks:database.books}); 
}
return res.json({error: "book already exist"});  
});

/*
route           /author/new
method          post
parameter       none
description     add new author
access          public
 */

booky.post("/author/new", (req,res)=> {
    const newAuthor = req.body;
    const preData = database.author.filter((author) => author.id === newAuthor.id);
    if(preData.length === 0) {
        database.author.push(newAuthor);
        return res.json({updatedbooks:database.author}); 
    }
    return res.json({error: "Author already exist"});  
});

/*
route           /publication/new
method          post
parameter       none
description     add new publication
access          public
 */

booky.post("/publication/new", (req,res) => {
    const newPublication = req.body;
    const preData = database.publication.filter((publication) => publication.id === newPublication.id);
    if(preData.length === 0) {
        database.publication.push(newPublication);
        return res.json({updatedbooks:database.publication}); 
    }
    return res.json({error: "Publication is already exist"})
});

/*
route           /publication/new
method          put
parameter       none
description     add new publication
access          public
 */

booky.put("publication/update/book/:isbn",(req,res)=> {
    //update the publications
database.publication.forEach((pub)=> {
    if(pub.id === req.body.pubId){
        return pub.books.push(req.params.isbn);
    }
})
//update the book
database.books.forEach((book)=> {
    if (book.ISBN === req.params.isbn){
        book.publication = req.body.pubId
        return  
    }
})
return res.json (
    {
        books: database.books, 
        publications: database.publication,
        messsage: "Successfully updated"
    }
)
})


booky.listen(3000,() => {
    console.log("Server is up and running good");
});












