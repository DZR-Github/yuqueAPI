"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Result = exports.statusCodeEnum = void 0;
var statusCodeEnum;
(function (statusCodeEnum) {
    statusCodeEnum[statusCodeEnum["OK"] = 200] = "OK";
    statusCodeEnum[statusCodeEnum["CREATED"] = 201] = "CREATED";
    statusCodeEnum[statusCodeEnum["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    statusCodeEnum[statusCodeEnum["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    statusCodeEnum[statusCodeEnum["FORBIDDEN"] = 403] = "FORBIDDEN";
    statusCodeEnum[statusCodeEnum["NOT_FOUND"] = 404] = "NOT_FOUND";
    statusCodeEnum[statusCodeEnum["REQUEST_TIME_OUT"] = 408] = "REQUEST_TIME_OUT";
    statusCodeEnum[statusCodeEnum["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
})(statusCodeEnum = exports.statusCodeEnum || (exports.statusCodeEnum = {}));
class Result {
    constructor(statusCode, data, message) {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
    }
    static success(data) {
        return new Result(statusCodeEnum.OK, data, "success");
    }
    static successWithCustomCode(statusCode, data) {
        return new Result(statusCode, data, "success");
    }
    static fail(statusCode, message) {
        return new Result(statusCode, "", message);
    }
}
exports.Result = Result;
//# sourceMappingURL=resultType.js.map