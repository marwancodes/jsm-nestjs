import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class RoleGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> {

    const request: Request = context.switchToHttp().getRequest();
    const role = request.headers.get('role');

    if (role !== 'admin') {
      throw new UnauthorizedException('You are not allowed to access this resource');
    }

    return true;
  }
}
