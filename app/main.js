"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const HttpException_1 = require("./filters/HttpException");
const port = 8081;
(async () => {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true
    }));
    app.useGlobalFilters(new HttpException_1.default());
    app.enableCors({
        credentials: true,
        methods: "GET,POST,PATCH,DELETE",
        origin: "*"
    });
    await app.listen(port);
})();
//# sourceMappingURL=main.js.map