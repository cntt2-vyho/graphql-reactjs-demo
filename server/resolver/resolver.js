const resolver = {
  Query: {
    books: async (parent, args, { mongooseDataMethods }) => await mongooseDataMethods.getAllBooks(),
    book: async (parent, { id }, { mongooseDataMethods }) => await mongooseDataMethods.getBookById(id),
    authors: async (parent, args, { mongooseDataMethods }) => await mongooseDataMethods.getAllAuthors(),
    author: async (parent, { id }, { mongooseDataMethods }) => await mongooseDataMethods.getAuthorById(id),
  },
  Book: {
    author: async ({ authorId }, args, { mongooseDataMethods }) => await mongooseDataMethods.getAuthorById(authorId)
  },
  Author: {
    books: async ({ id }, args, { mongooseDataMethods }) => await mongooseDataMethods.getAllBooks({ authorId: id })
  },
  Mutation: {
    createAuthor: async (parent, args, { mongooseDataMethods }) => await mongooseDataMethods.createAuthor(args),
    createBook: async (parent, args, { mongooseDataMethods }) => await mongooseDataMethods.createBook(args)
  } 
}

module.exports = resolver