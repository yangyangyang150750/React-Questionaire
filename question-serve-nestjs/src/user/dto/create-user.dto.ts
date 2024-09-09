/* eslint-disable prettier/prettier */
// 定义创建用户时的传输的数据格式
export class CreateUserDto {
  readonly username: string;
  readonly password: string;
  readonly nickname?: string;
}
