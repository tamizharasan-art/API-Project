// Requirement for our project.

// we are the book managing company

// books
// isbn, name,author,title,pub data,num page,author[],category[]

// AUTHOR 
// id,name,books[]

// PUBLICATION
// ID,name,books[]

// We have design the API with these things....

//1.books
//We need to design an API:-
//to get all the books - done
//to get specific book -done
//to get list specific category books -done
//to get list of books on languages - done

//2.AUTHORS
//We need to design an API:-
//to get specific author - done
//to get all authors - done
//to get a list of authors based on books -done


//PUBLICATION
//We need to design an API:-
//To get all the publication-done
//to get a specific publication - done
//to get a list of publications based books - done

//POST REQUEST
//1.add new author - done
//2.add new book - done
//3.add new publication - done


//PUT REQUEST
//Update book details if author is changed.  

//DELETE request

//1.delete a book - done
//2.delete a author from a book - to be done
//3.delete author from book and related book from author
 
//schema - Blueprint of how the data have to be constructed
//MongoDb is schemaless
//Mongoose has schema
//Mongoose -> validation and relationship between datas
//model - document model of MongoDB
//schema -> model -> use them

// ANOTHER METHOD TO CONNECT TO THE MONGODB
// async function connect(){
//     try {
//        await mongoose.connect(process.env.MONGO_URL);
//         console.log("connected successfully");
//     }
//     catch(error){
//         console.log("error");
//     }
// }

// connect();

//PARAMETER WHICH ARE USED BY ARADHANA WHILE DB CONNECTION

 // {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true,
    //     useFindAndModify: false,
    //     useCreateIndex: true,
    // }





















































































