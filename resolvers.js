import { MovieModel } from "./models/Movie.js"
import { AuthorModel } from "./models/Author.js"

export const resolvers = {
  Query: {
    movies: async () => await MovieModel.find(),
    authors: async () => await AuthorModel.find(),
    movie: async (_, { id }) => await MovieModel.findById(id),
    author: async (_, { id }) => await AuthorModel.findById(id),
    moviesByYear: async (_, { year }) => await MovieModel.find({ year }),
    topRatedMovies: async (_, { minRating }) =>
      await MovieModel.find({ rating: { $gte: minRating } }),
  },

  Movie: {
    author: async (parent) => await AuthorModel.findById(parent.authorId),
  },

  Author: {
    movies: async (parent) => await MovieModel.find({ authorId: parent.id }),
  },

  Mutation: {
    addMovie: async (_, { title, filmed, year, rating, authorId }) => {
      const newMovie = new MovieModel({
        title,
        filmed,
        year,
        rating,
        authorId,
      })

      await newMovie.save()
      return newMovie
    },

    deleteMovie: async (_, { id }) => {
      const res = await MovieModel.findByIdAndDelete(id)
      return !!res
    },

    updateMovieRating: async (_, { id, rating }) => {
      const movieForUpdate = await MovieModel.findByIdAndUpdate(id, rating)
      return movieForUpdate
    },
  },
}
