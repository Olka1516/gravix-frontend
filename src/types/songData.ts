export interface ISong {
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
  likes: string[]
}

export interface ISongDictionary {
  [username: string]: ISongGetted[]
}
export interface ISongDictionaryById {
  [id: string]: ISongGetted
}

export interface ISongItem {
  title: string
  author: string
  image: string
  song: string
}

export interface ISongGetted {
  title: string
  description: string
  lyrics: string
  image: string
  song: string
  genres: string[]
  author: string
  duration: string
  releaseYear: string
  rating: number
  ratingCount: number
  _id: string
  likes: string[]
}
