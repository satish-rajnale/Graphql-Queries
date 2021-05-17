



///************for Books in books.js */
// adding a book
mutation {
    addBook (bookName:"Lulab", authorId:2){
      id
      bookName
    }
}
mutation {
    addAuthor (name:"marcello"){
      id
      name
    }
}

// to get a list of books
query{
    books{
      id
      bookName
      author{
        name
      }
    }
  }
// to get a list of authors
  query{
    authors{
      id
      name
    }
  }