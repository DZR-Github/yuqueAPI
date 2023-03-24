export declare enum statusCodeEnum {
    OK = 200,
    CREATED = 201,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    REQUEST_TIME_OUT = 408,
    INTERNAL_SERVER_ERROR = 500
}
export declare class Result {
    private statusCode;
    private data;
    private message;
    constructor(statusCode: statusCodeEnum, data: any, message: string);
    static success(data: any): Result;
    static successWithCustomCode(statusCode: statusCodeEnum, data: any): Result;
    static fail(statusCode: statusCodeEnum, message: string): Result;
}
