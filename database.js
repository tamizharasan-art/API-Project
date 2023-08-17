const books = [
    {
        ISBN: "12345Book",
        title: "Tesla",
        Pubdate: "2021-08-05",
        language: ["en","tamil"],
        publication: [1],
        author: [1,2],
        numpage: 250,
        category: ["tech","space","education"]
    }
]

const author = [
    {
        id: 1,
        name: "Tamiz",
        books:["12345Book","secretBook"]
    },
    {
        id: 2,
        name: "Mahirat",
        books:["12345Book"]
    }
]

const publication = [
    {
        id: 1, 
        name: "MillionTimes",
        books :["12345Book"]
    },
    {
        id:2,
        name:"blahblah",
        books:[] 
    }
]

module.exports = {books, author, publication};