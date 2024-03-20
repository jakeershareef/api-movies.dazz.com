import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthenticationService } from 'src/authentication/authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService,
        private readonly authenticationService: AuthenticationService) { }
    async canActivate(context: ExecutionContext) {
        try {
            const req = context.switchToHttp().getRequest();
            let token = req.headers.authorization;
            let secret = process.env.SECRET;
            if (token) {
                // we have to check valid token or not
                let user = await this.jwtService.verify(token, { secret });
                let query = {
                    _id: user.id
                }
                let findUser = await this.authenticationService.findUserById(query)
                req.user = findUser;
                return true;
            } else {
                return false;
            }
        } catch (err) {
            console.log("err", err)
            return false;
        }
    }
}
