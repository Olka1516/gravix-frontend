import type { ISongGetted } from './songData'

export interface IPlaylistCreate {
  name: string
  visibility: string
}

export interface IPlaylist extends IPlaylistCreate {
  _id: string
  ownerID: string
  song: ISongGetted[]
  likes: string[]
}

export enum IPlaylistVisibility {
  PUBLIC = 'public',
  PRIVATE = 'private',
}
