import type { JwtAccessPayload } from './payloads.type';

export interface RequestWithRefreshToken extends Omit<Request, 'body'> {
  body: {
    refresh_token: string;
  } & Request['body'];
}

export interface RequestWithPayload<Payload = JwtAccessPayload>
  extends Request {
  user: Payload;
}
