"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
let HttpExceptionFilter = class HttpExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp(), response = ctx.getResponse(), request = ctx.getRequest(), path = request.originalUrl;
        const status = exception instanceof common_1.HttpException ? exception.getStatus() : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        const exceptionResponse = exception.getResponse();
        let message, error;
        if (typeof exceptionResponse === "object") {
            if (exceptionResponse.hasOwnProperty("message")) {
                message = exceptionResponse["message"];
            }
            if (exceptionResponse.hasOwnProperty("error")) {
                error = exceptionResponse["error"];
            }
            else {
                error = "请求失败";
            }
        }
        else {
            error = exceptionResponse;
            message = exceptionResponse;
        }
        common_1.Logger.error(`'${path}': ${error}, MESSAGE: ${message}`);
        const errorResponse = {
            statusCode: status,
            message: error,
            url: request.originalUrl,
            data: {
                error: message
            }
        };
        response.status(status);
        response.header("Content-Type", "application/json; charset=utf-8");
        response.send(errorResponse);
    }
};
HttpExceptionFilter = __decorate([
    (0, common_1.Catch)(common_1.HttpException)
], HttpExceptionFilter);
exports.default = HttpExceptionFilter;
//# sourceMappingURL=HttpException.js.map