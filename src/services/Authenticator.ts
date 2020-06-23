import jwt, { JsonWebTokenError } from "jsonwebtoken";

interface AuthenticationData {
  id: string;
}

export default class Authenticator {
  private static readonly EXPIRES_IN = "1y";

  public generateToken(input: AuthenticationData): string {
    const token = jwt.sign(input, process.env.JWT_KEY as string, {
      expiresIn: Authenticator.EXPIRES_IN,
    });
    return token;
  }

  public getData(token: string): AuthenticationData {
    const payload = jwt.verify(token, process.env.JWT_KEY as string) as any;
    const result = {
      id: payload.id,
    };
    return result;
  }
}
