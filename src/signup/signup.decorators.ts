import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { SignupSwaggerDocs } from './signup.swagger';

export function SignupSwagger() {
  return applyDecorators(
    ApiOperation(SignupSwaggerDocs.apiOperation),
    ApiBody(SignupSwaggerDocs.apiBody),
    ApiResponse(SignupSwaggerDocs.apiResponses.created),
    ApiResponse(SignupSwaggerDocs.apiResponses.badRequest),
    ApiResponse(SignupSwaggerDocs.apiResponses.conflict)
  );
}
