import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const ParamId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const id = request.params.id;
    return Number(id);
  },
);
