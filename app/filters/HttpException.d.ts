import { ArgumentsHost, ExceptionFilter, HttpException } from "@nestjs/common";
declare class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost): void;
}
export default HttpExceptionFilter;
