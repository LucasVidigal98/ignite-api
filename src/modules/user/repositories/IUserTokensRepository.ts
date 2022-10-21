import { UserTokens } from "../infra/typeorm/entities/UserTokens";
import { ICreateUserTokenDTO } from "./DTO/ICreateUserTokenDTO";

export interface IUserTokensRepository {
  create({ expires_date, refresh_token, user_id }: ICreateUserTokenDTO): Promise<UserTokens>;
  findByUserIdAndToken(userId: string, refresh_token: string): Promise<UserTokens>;
  deleteById(id: string): Promise<void>;
}