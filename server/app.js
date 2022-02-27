const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const mongoose = require('mongoose')

// Load schema & resolvers
const typeDefs = require('./schema/schema')
const resolvers = require('./resolver/resolver')

//load db method
const mongooseDataMethods = require('./data/db')



// connect moongose DB
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://myvyho:6GySR!g!SZ!CqKf@cluster0.y1ezw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('MongoDB connected !!!');
  } catch (error) {
    console.log(error.message);
    process.exit(1)

  }
}

connectDB()

const app = express();
const PORT = 4000

async function startApolloServer(typeDefs, resolvers) {
  const server = new ApolloServer({ typeDefs, resolvers, context: () => ({ mongooseDataMethods }) })

  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });

  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}${server.graphqlPath}`);
  })
}

startApolloServer(typeDefs, resolvers);

