import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const token = req.headers.authorization;

    if (!token || !token.startsWith('Bearer ')) {
      throw new UnauthorizedException('Invalid token');
    }

    const decodedToken = jwt.verify(token.substring(7), 'secret') as JwtPayload;
    req.userId = decodedToken.id;

    return true;
  }
}
