"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const swagger_1 = require("@nestjs/swagger");
const nest_winston_1 = require("nest-winston");
const winston_logging_1 = require("./common/logging/winston.logging");
const all_exceptions_filter_1 = require("./common/filters/all-exceptions.filter");
const helmet_1 = require("helmet");
const cookieParser = require("cookie-parser");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        bufferLogs: true,
        logger: nest_winston_1.WinstonModule.createLogger(winston_logging_1.winstonConfig),
    });
    const configService = app.get(config_1.ConfigService);
    const logger = app.get(nest_winston_1.WINSTON_MODULE_NEST_PROVIDER);
    const port = configService.get('PORT') || 8000;
    const appUrls = configService.get('APP_URL')?.split(',') || ['*'];
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
        errorHttpStatusCode: 422,
    }));
    app.useGlobalFilters(new all_exceptions_filter_1.AllExceptionsFilter(logger));
    app.use((0, helmet_1.default)({ contentSecurityPolicy: false }));
    app.use(cookieParser());
    app.enableCors({
        origin: appUrls,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    });
    app.enableShutdownHooks();
    const swaggerConfig = new swagger_1.DocumentBuilder()
        .setTitle('ONE Logistic API')
        .setDescription('API documentation for ONE Logistic backend')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const swaggerDoc = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
    swagger_1.SwaggerModule.setup('api/docs', app, swaggerDoc);
    await app.listen(port);
    logger.log(`🚀 Server is running on: http://localhost:${port}/api`);
    logger.log(`📘 Swagger UI: http://localhost:${port}/api/docs`);
}
bootstrap().catch((error) => {
    const fallbackLogger = nest_winston_1.WinstonModule.createLogger(winston_logging_1.winstonConfig);
    fallbackLogger.error('❌ Failed to start application', error.stack);
});
//# sourceMappingURL=main.js.map