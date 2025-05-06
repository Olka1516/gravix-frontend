import type { ISongGetted } from './songData'

export interface IPlaylist {
  _id: string
  ownerID: string
  name: string
  visibility: string
  song: ISongGetted[]
}
