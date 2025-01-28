import { type BaseSchema } from "../common/dto/base.dto";

export interface IUser extends BaseSchema {
  _id: string;
  username: string;
  email: string;
  active?: boolean;
  role: "USER" | "ADMIN";
  password: string;
  walletBalance: number;  // Add this line for wallet balance
}
