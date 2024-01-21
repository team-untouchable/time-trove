export interface RequestWithRefreshToken extends Omit<Request, 'body'> {
  body: {
    refresh_token: string;
  } & Request['body'];
}

export interface RequestWithPayload<Payload> extends Request {
  user: Payload;
}
