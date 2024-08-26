import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context).getContext();
    const token = ctx.req.headers.authorization;

    if (!token || !token.startsWith('Bearer ')) {
      throw new UnauthorizedException('Invalid token');
    }

    const decodedToken = jwt.verify(token.substring(7), 'secret') as JwtPayload;
    ctx.userId = decodedToken.id;

    return true;
  }
}
