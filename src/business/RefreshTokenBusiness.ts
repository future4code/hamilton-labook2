import RefreshTokenDatabase from "../data/RefreshTokenDatabase";
import CustomError from "../err/CustomError";
import Authenticator from "../services/Authenticator";

export default class RefreshTokenBusiness {
  public async getAccessToken(refreshToken: string) {
    const result = await new RefreshTokenDatabase().getRefreshToken(
      refreshToken
    );

    console.log(result);

    if (!result) throw new CustomError("Invalid refresh token", 403);

    const accessToken = new Authenticator().generateToken({
      id: result.user_id,
    });

    return accessToken;
  }

  public async createRefreshToken(user_id: string) {
    const refreshTokenDatabase = new RefreshTokenDatabase();

    const refreshToken = new Authenticator().generateRefreshToken({
      id: user_id,
    });

    const result = await refreshTokenDatabase.getRefreshTokenById(user_id);

    if (result) {
      await refreshTokenDatabase.updateRefreshToken(refreshToken, user_id);
    } else {
      await refreshTokenDatabase.createRefreshToken(refreshToken, user_id);
    }

    return refreshToken;
  }
}
