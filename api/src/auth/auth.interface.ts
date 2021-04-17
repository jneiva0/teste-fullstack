export interface JwtPayload {
  // sub = subject, normalmente o id do usuario
  sub: string
  email: string
}

export interface Payload {
  userId: string
  email: string
}
