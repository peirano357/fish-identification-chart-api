"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const transform_interceptor_1 = require("./transform.interceptor");
const common_2 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const serverless_express_1 = require("@vendia/serverless-express");
let server;
async function bootstrap() {
    const logger = new common_2.Logger();
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.useGlobalInterceptors(new transform_interceptor_1.TransformInterceptor());
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Fish Identification Chart API')
        .setDescription('Purchase critter lists by region and start logging your spots')
        .setVersion('1.0')
        .addBearerAuth({ in: 'header', type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'token')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('apidocs', app, document);
    await app.init();
    const expressApp = app.getHttpAdapter().getInstance();
    return (0, serverless_express_1.default)({ app: expressApp });
}
const handler = async (event, context, callback) => {
    server = server !== null && server !== void 0 ? server : (await bootstrap());
    return server(event, context, callback);
};
exports.handler = handler;
//# sourceMappingURL=lambda.js.map