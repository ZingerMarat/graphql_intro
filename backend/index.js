import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"
import { typeDefs } from "./schema.js"
import { resolvers } from "./resolvers.js"
import dotenv from "dotenv"
import mongoose from "mongoose"

dotenv.config()
const mongoUri = process.env.MONGO_URI
await mongoose.connect(mongoUri)
console.log("MongoDB coonected:", mongoose.connection.name)

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const { url } = await startStandaloneServer(server)

console.log("Server ready: ", url)
