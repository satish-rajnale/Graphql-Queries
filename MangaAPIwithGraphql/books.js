const express = require("express");
const expressGraphQl = require("express-graphql").graphqlHTTP;
const app = express();
const {
  GraphQLSchema,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
} = require("graphql");

const authors = [
  { id: 1, name: "J K Roman" },
  { id: 2, name: "allicia" },
  { id: 3, name: "maed" },
];

const books = [
  { id: 1, bookName: "Sorrows of bird", authorId: 1 },
  { id: 2, bookName: "Head butler", authorId: 1 },
  { id: 3, bookName: "Rainging over the world", authorId: 1 },
  { id: 4, bookName: "Moonlight", authorId: 2 },
  { id: 5, bookName: "count Verosky", authorId: 2 },
  { id: 6, bookName: "Joy of youth", authorId: 3 },
];

const BookType = new GraphQLObjectType({
  name: "Book",
  description: "book written by an author",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    bookName: { type: GraphQLNonNull(GraphQLString) },
    authorId: { type: GraphQLNonNull(GraphQLInt) },
    author: {
      type: AuthorType,
      // resolving with parent
      resolve: (parent, args) => {
        return authors.find((author) => author.id === parent.authorId);
      },
      // resolve as defining parent as book
      // resolve: (book) => {
      //   return authors.find((author) => author.id === book.authorId);
      // },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  description: "author type",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    books: {
      type: GraphQLList(BookType),
      resolve: (author) => {
        return books.filter((book) => book.authorId === author.id);
      },
    },
  }),
});

// const schema = new GraphQLSchema({
//     query: new GraphQLObjectType({
//         name: "Hello", // name if contains space throws error use HelloWorld instead of Hello World
//         fields:() =>  ({
//             message: {type: GraphQLString, resolve:() => "World" }
//         })
//     })
// })

const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "root query",
  // if not using a function as a return type here then eror might occur 
  //that our Authortype must be defined before the BookType and if done that then BookType throws error cuz its defined inside AuthorType and it cant find it
  // so its best to use a function so that our types gets pre-defined
  fields: () => ({ 
    book: {
      type: BookType,
      description: "A single book",
      args:{
          id: {type: GraphQLInt}
      },
      resolve: (parent, args) => {return books.find(book => book.id === args.id)},
    },
    author: {
        type: AuthorType,
        description: "A single author",
        args:{
            id: {type: GraphQLInt}
        },
        resolve: (parent, args) => {return authors.find(author => author.id === args.id)},

      },
    books: {
      type: new GraphQLList(BookType),
      description: "List of books",
      resolve: () => books,
    },
    authors: {
      type: new GraphQLList(AuthorType),
      description: "List of authors",
      resolve: () => authors,
    },
  }),
});

const RootMutationType = new GraphQLObjectType({
    name: "Mutation",
    description: "root mutation",
    fields: () => ({
        addBook: {
            type: BookType,
            description:"add a book",
            args:{
                bookName: {type: GraphQLNonNull(GraphQLString)},
                authorId: {type: GraphQLNonNull(GraphQLInt)}
            },
            resolve:(parent , args) =>{
                const book = {
                    id: books.length +1,
                    authorId: args.authorId,
                    bookName: args.bookName
                };

                books.push(book);
                return book
            }       
        },
// adding a author
        addAuthor: {
            type: AuthorType,
            description:"add a author",
            args:{
                name: {type: GraphQLNonNull(GraphQLString)},
             
            },
            resolve:(parent , args) =>{
                const author = {
                    id: authors.length +1,
                    name: args.name
                };

                authors.push(author);
                return author
            }       
        }
    })
})

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType 
});

app.use(
  "/graphql",
  expressGraphQl({
    schema: schema,
    graphiql: true,
  })
);

app.listen(5000, () => {
  console.log(`server running on http://localhost:5000`);
});
