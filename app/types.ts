// subset of a randomuser.me user

export interface User {
  gender: string
  name: {
    title: string
    first: string
    last: string
  }
  email: string
  picture: {
    thumbnail: string
  }
  location: {
    city: string
    state: string
  }
  login: {
    uuid: string
  }
}

// entire response type
export interface UserResponse {
  results: User[]
  info: {
    results: number
    page: number
  }
}
