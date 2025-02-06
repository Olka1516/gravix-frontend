export interface ISong {
  username: string
  title: string
  description: string
  lyrics: string
  image: null | File
  song: null | File
  genres: string[]
  author: string
  duration: string
  releaseYear: string
  rating: number
  ratingCount: number
}
