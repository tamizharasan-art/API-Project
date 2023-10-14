require("dotenv").config();

const express = require("express");
var bodyParser = require("body-parser");

//mongoose
const mongoose = require("mongoose");

//database
const database = require("./database/database");

//Models
const BookModel = require("./database/book.js");
const AuthorModel = require("./database/author");
const PublicationModel= require("./database/publication");

//initialize express
const booky = express();
booky.use(bodyParser.urlencoded({extended: true}));
booky.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URL).then(()=> console.log("Connection Established"));



/*
route           /
method          get
parameter       none
description     get all books
access          public
 */

booky.get("/",async (req,res) => {
    const getAllBooks = await BookModel.find();
return res.json(getAllBooks);
});

/*
route           /is
method          get
parameter       isbn
description     get specified books
access          public
 */

booky.get("/is/:isbn", async (req,res) => {
    const getSpecificBook = await BookModel.findOne({ISBN:req.params.isbn});

    //Null !0=1 !1=0
    if(!getSpecificBook){
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

booky.get("/c/:category",  async (req,res)  => {
    const getSpecificBook = await BookModel.findOne({category: req.params.category});

    if (!getSpecificBook){
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

booky.get("/l/:language", async (req,res) => {

    const getSpecificBook = await BookModel.findOne({language: req.params.language});

    if(!getSpecificBook){
        return res.json({error: `no book found on the language ${req.params.language}`})
    }

    return res.json({book: getSpecificBook});
});

/*
route           /author
method          get
parameter       none
description     get author
access          public
 */

booky.get("/author", async (req,res) => {
    const getAllAuthor=await AuthorModel.find();
    return res.json(getAllAuthor);
});

/*
route           /author/books
method          get
parameter       isbn
description     get author based on the book
access          public
 */

booky.get("/author/book/:isbn",async (req,res) => {
    const getSpecificAuthor = await AuthorModel.findOne({books: req.params.isbn});
    if (!getSpecificAuthor){
        return res.json({error: `No author is found in the isbn of ${req.params.isbn}`})
    }
    return res.json({author: getSpecificAuthor});
});

/*
route           /author
method          get
parameter       idn
description     get author based on id
access          public
 */

booky.get("/author/:idn", async (req,res) => {
    const getSpecificAuthor = await AuthorModel.findOne({id:req.params.idn});

    if(!getSpecificAuthor){
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

booky.get("/publication", async (req,res) => {
    const getAllPublication = await PublicationModel.find();
    return res.json(getAllPublication);
});

/*
route           /publication
method          get
parameter       id
description     get publicaion based on id
access          public
 */

booky.get("/publication/:id",async (req,res) => {
    const getSpecificPublication = await PublicationModel.findOne({id: req.params.id});
  

    if(!getSpecificPublication){
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

booky.get("/publication/book/:books",async (req,res) => {
    const getSpecificPublication = await PublicationModel.findOne({books: req.params.books})
    
if(!getSpecificPublication){
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

booky.post("/book/new", async (req,res)=> {
    const {newBook} = req.body;
    const addNewBook =  BookModel.create(newBook);
    return res.json({
        books: addNewBook,
        Message: "Book Added"
    })
});

/*
route           /author/new
method          post
parameter       none
description     add new author
access          public
 */

booky.post("/author/new", async (req,res)=> {
    const {newAuthor} = req.body;
    const addNewAuthor = AuthorModel.create(newAuthor);
        return res.json({
        author: addNewAuthor,
        Messsage:" Author Added Successfully"
    });  
});

/*
route           /publication/new
method          post
parameter       none
description     add new publication
access          public
 */

booky.post("/publication/new", async (req,res) => {
    const {newPublication} = req.body;
    const addNewPublication = PublicationModel.create(newPublication);
    return res.json({
        Publication: addNewPublication,
        Message: "Publication Added Successfully"
    })
});


/*****************PUT***************************/

/*
route          /books/update/:isbn
method          put
parameter       isbn
description     update new book
access          public
 */

booky.put("/books/update/:isbn",async (req,res) =>{
    const updatedBook = await BookModel.findOneAndUpdate(
        {
            ISBN: req.params.isbn
        },
        {
            title: req.body.bookTitle
        },
        {
            new:true //It show every updated things in the front end
        });
    return res.json({
        book: updatedBook
    });

});

/***************Updating New Author and books*****************************/

/*
route           book/author/updates/:isbn
method          put
parameter       isbn
description     update books and authors array
access          public
 */

booky.put("/book/author/updates/:isbn", async (req,res) => {
    //updating book array

    const updatedBook = await BookModel.findOneAndUpdate(
        {
            ISBN: req.params.isbn
        },
        {
            $addToSet :
            {
                author  : req.body.authorId
            }
        },
        {
            new: true
        });

    //updating author array

    const updatedAuthor = await AuthorModel.findOneAndUpdate(
        {
            id: req.body.authorId
        },
        {
            $addToSet:
                {
                    books: req.params.isbn
                 }
        },
        {
            new: true
        }); 
    
    return res.json ({
        books: updatedBook,
        authors: updatedAuthor
    });

});

/********************delete books***********************/

/*
route           book/update/delete/:isbn
method          delete
parameter       isbn
description     update book by delete
access          public
 */

booky.delete("/book/delete/:isbn", async (req,res) => {    //using mongoDb
    const updatedBook = await BookModel.findOneAndDelete(
        {
            ISBN: req.params.isbn
        })

    return res.json({
        books: updatedBook,
        Message: "Jeichito Maara!!!"
    })
});




/*
route           /publication/update/book/:isbn
method          put
parameter       isbn
description     update new publication
access          public
 */

booky.put("/publication/update/book/:isbn",(req,res) => {

    //update the publications
     database.publication.forEach((pub) =>{
        if(pub.id === req.body.pubId){
            return pub.books.push(req.params.isbn);
        }
        // if(pub.books === req.params.isbn){
        //     return pub.books.;
        // }
     })
     
     //update the books

     database.books.forEach((book)=> {
        if(book.ISBN === req.params.isbn){
            book.publication = req.body.pubId
            return;
        }
     })


     return res.json(
        {
            books: database.books,
            publications: database.publication,
            message: "updated successfully"
        }
     )
});

//DELETE REQUEST

/*
route           /book/delete/:isbn
method          delete
parameter       isbn
description     delete a book
access          public
 */

booky.delete("/book/delete/:isbn",(req,res)=> {

    const updatedBookDatabase = database.books.filter((book)=>
    book.ISBN !== req.params.isbn)

    database.books = updatedBookDatabase;

    return res.json({
        books:database.books
    })

});

/*
route           /author/delete/:id
method          delete
parameter       id
description     delete a author
access          public
 */

booky.delete("/author/delete/:id", (req,res)=> { 

    const updatedAuthorDatabase = database.books.filter((book)=> 
    book.author !== req.params.id)
    
    database.books = updatedAuthorDatabase 

    return res.json({
        books: database.books
    })
    
})


/*
route           /author/delete/:id
method          delete
parameter       isbn,authorId
description     delete a author from book and delete a respective book from author
access          public
 */

booky.delete("/book/delete/author/:isbn/:authorId",(req,res)=> {

    //Update the books database

    database.books.forEach((book)=> {
        if(book.ISBN === req.params.isbn){
            const newAuthorList = book.author.filter((eachAuthor)=> 
          eachAuthor !== parseInt(req.params.authorId));

          book.author = newAuthorList;
          return;
        }
       
    })

    //Update the author database

    database.author.forEach((eachAuthor)=>{
        if(eachAuthor.id === parseInt(req.params.authorId)){
          const newBookList = eachAuthor.books.filter((eachBook)=>
            eachBook !== req.params.isbn);

            eachAuthor.books = newBookList;
        return;
        }
        
    })
    
    return res.json({
        books:database.books,
        author: database.author
    })
})



booky.listen(3000,() => {
    console.log("Server is up and running good");
});












