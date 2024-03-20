import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { JwtService } from "@nestjs/jwt";
import { AuthenticationService } from './authentication.service';
import { CreateAuthenticationDto } from './dto/create-authentication.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { INVALID_CREDENTIALS, USER_EXISTS, USER_LOGIN_SUCCESS, USER_NOT_EXISTS, USER_REGISTRATION } from 'src/constants/messageConstant';

@Controller('users')
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly jwtService: JwtService,
  ) { }

  @Post("signup")
  async create(
    @Body() createAuthenticationDto: CreateAuthenticationDto,
    @Res() res: any,
    @Req() req: any
  ) {
    try {
      const userName = req.body.user_name;
      const userExist = await this.authenticationService.findUserByUserName(userName);
      if (userExist) {
        return res.status(422).json({
          success: false,
          message: USER_EXISTS,
        });
      } else {
        const user = await this.authenticationService.create(
          createAuthenticationDto
        );
        return res.status(200).json({
          success: true,
          message: USER_REGISTRATION,
          data: user,
        });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }

  @Post("signin")
  async loginUser(
    @Body() loginAuthDto: LoginAuthDto,
    @Res() res: any,
    @Req() req: any
  ) {
    try {
      const userName = req.body.user_name;
      const user = await this.authenticationService.findUserByUserName(userName);
      if (user) {
        const loginUser = await this.authenticationService.signIn(loginAuthDto);

        // preparing payload
        if (loginUser) {
          const payload = {
            user_name: loginUser.user_name,
            id: loginUser.id,
            password: loginUser.password
          };
          // creating tokens
          const jwtToken = await this.jwtService.sign(payload);

          const refreshToken = await this.jwtService.sign(payload, {
            expiresIn: "10d",
          });


          return res.status(200).json({
            success: true,
            message: USER_LOGIN_SUCCESS,
            data: {
              userData: user,
              access_token: jwtToken,
              refresh_token: refreshToken,
            },
          });
        } else {
          return res.status(401).json({
            success: false,
            message: INVALID_CREDENTIALS,
          });
        }
      } else {
        return res.status(403).json({
          success: false,
          message: USER_NOT_EXISTS,
        });
      }
    } catch (err) {
      console.log("err", err)
      return res.status(500).json({
        success: true,
        message: err.message,
      });
    }
  }
}
