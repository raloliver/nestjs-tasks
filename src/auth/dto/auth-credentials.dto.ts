import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

const PASS_REGEX = /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
export class AuthCredentialsDto {
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(24)
  @Matches(PASS_REGEX, { message: 'create a stronger password' })
  password: string;
}
