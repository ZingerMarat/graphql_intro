export const typeDefs = `#graphql
    type Movie {
        id: ID!
        title: String!
        filmed: Boolean!
        year: Int!
        rating: Float
        author: Author!
    }

    type Author {
        id: ID!
        name: String!
        age: Int!
        movies: [Movie!]!
    }

    type Query{
        movies: [Movie!]!
        authors: [Author!]!
        movie(id: ID!): Movie
        author(id: ID!): Author
        moviesByYear(year: Int!): [Movie!]!
        topRatedMovies(minRating: Float!): [Movie!]!
    }
`
