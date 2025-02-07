export interface ISong {
  username: string
  title: string
  description: string
  lyrics: string
  image: null | File | string
  song: null | File | string
  genres: string[]
  author: string
  duration: string
  releaseYear: string
  rating: number
  ratingCount: number
  id?: string
}

export interface ISongDictionary {
  [username: string]: ISong[]
}

export interface ISongItem {
  title: string
  author: string
  image: string
  song: string
}
