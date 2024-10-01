import { applyDecorators } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { LoginSwaggerDocs } from "./login.swagger";

export function LoginSwagger() {
  return applyDecorators(
    ApiOperation(LoginSwaggerDocs.apiOperation),
    ApiBody(LoginSwaggerDocs.apiBody),
    ApiResponse(LoginSwaggerDocs.apiResponses.logged),
    ApiResponse(LoginSwaggerDocs.apiResponses.badRequest),
  );
}
