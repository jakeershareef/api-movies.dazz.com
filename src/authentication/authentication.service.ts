import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import * as bcrypt from "bcrypt";
import { CreateAuthenticationDto } from './dto/create-authentication.dto';
import { UpdateAuthenticationDto } from './dto/update-authentication.dto';
import { UserModel } from 'src/models/userModel';
import { LoginAuthDto } from './dto/login-auth.dto';

@Injectable()
export class AuthenticationService {
  constructor(@InjectModel("Users") private userModel: typeof UserModel) { }
  async create(createAuthenticationDto: CreateAuthenticationDto) {
    const userDetails = await this.userModel.create(createAuthenticationDto);
    return userDetails;
  }

  async findUserByUserName(userName: string) {
    const userDetails = await this.userModel.findOne({ user_name: userName });
    return userDetails;
  }
  async findUserByEmail(email: string) {
    const userDetails = await this.userModel.findOne({ email: email });
    return userDetails;
  }

  async signIn(loginAuthDto: LoginAuthDto) {
    const userName = loginAuthDto.user_name;
    // finding user from db
    const user: any = await this.userModel.findOne({ user_name: userName });

    const password = user.password;
    if (user) {
      //comparing db saved password and entered password
      const matchPassword = await bcrypt.compare(
        loginAuthDto.password,
        password
      );
      if (matchPassword) {
        return user;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  async findUserById(query) {
    return this.userModel.findOne(query)
  }
}
