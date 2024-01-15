import type { Type } from '@nestjs/common';
import { applyDecorators } from '@nestjs/common';
import type { ApiResponseOptions } from '@nestjs/swagger';
import { ApiOkResponse, getSchemaPath } from '@nestjs/swagger';

export function CustomApiResponse<TModel extends Type<any> | Type<any>[]>(
  type: TModel,
  ApiResponseClass: (
    options?: ApiResponseOptions,
  ) => MethodDecorator & ClassDecorator = ApiOkResponse,
) {
  const isArray = Array.isArray(type);
  const schema = isArray
    ? { type: 'array', items: { $ref: getSchemaPath(type[0]) } }
    : { $ref: getSchemaPath(type) };

  return applyDecorators(
    ApiResponseClass({
      schema: {
        allOf: [{ properties: { data: schema } }],
      },
    }),
  );
}
