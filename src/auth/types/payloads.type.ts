export interface JwtAccessPayload {
  uid: string;
  email: string;
  username: string;
}

export interface JwtRefreshPayload {
  uid: string;
}
