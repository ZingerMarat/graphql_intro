import { movies, authors } from "./data.js"

export const resolvers = {
  Query: {
    movies: () => movies,
    authors: () => authors,
    movie: (_, { id }) => movies.find((movie) => movie.id == id),
    author: (_, { id }) => authors.find((author) => author.id == id),
  },
}
