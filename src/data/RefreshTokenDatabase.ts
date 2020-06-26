import BaseDatabase from "./BaseDatabase";

export default class RefreshTokenDatabase extends BaseDatabase {
  private static readonly TABLE_NAME: string = "labook_refreshtoken";

  public async getRefreshToken(refresh_token: string) {
    return (
      await this.getConnection()
        .select("*")
        .where({
          refresh_token,
        })
        .into(RefreshTokenDatabase.TABLE_NAME)
    )[0];
  }

  public async getRefreshTokenById(user_id: string) {
    return (
      await this.getConnection()
        .select("*")
        .where({
          user_id,
        })
        .from(RefreshTokenDatabase.TABLE_NAME)
    )[0];
  }

  public async updateRefreshToken(refresh_token: string, user_id: string) {
    await this.getConnection()
      .update({ refresh_token })
      .where({ user_id })
      .into(RefreshTokenDatabase.TABLE_NAME);
  }

  public async createRefreshToken(refresh_token: string, user_id: string) {
    await this.getConnection()
      .insert({
        refresh_token,
        user_id,
      })
      .into(RefreshTokenDatabase.TABLE_NAME);
  }
}
