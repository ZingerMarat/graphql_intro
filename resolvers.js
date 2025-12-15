import { movies, authors } from "./data.js"

export const resolvers = {
  Query: {
    movies: () => movies,
    authors: () => authors,
    movie: (_, { id }) => movies.find((movie) => movie.id === id),
    author: (_, { id }) => authors.find((author) => author.id === id),
    moviesByYear: (_, { year }) => movies.filter((m) => m.year === year),
    topRatedMovies: (_, { minRating }) => movies.filter((m) => m.rating >= minRating),
  },

  Movie: {
    author: (parent) => authors.find((a) => a.id === parent.authorId),
  },

  Author: {
    movies: (parent) => movies.filter((m) => m.authorId === parent.id),
  },

  Mutation: {
    addMovie: (_, { title, filmed, year, rating, authorId }) => {
      const newMovie = {
        id: String(movies.length + 1),
        title,
        filmed,
        year,
        rating,
        authorId,
      }

      movies.push(newMovie)
      return newMovie
    },

    deleteMovie: (_, { id }) => {
      const index = movies.findIndex((m) => m.id === id)
      if (index === -1) return false
      movies.splice(index, 1)
      return true
    },

    updateMovieRating: (_, { id, rating }) => {
      const movieForUpdate = movies.find((m) => m.id === id)

      if (!movieForUpdate) {
        return null
      }

      movieForUpdate.rating = rating
      return movieForUpdate
    },
  },
}
