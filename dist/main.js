"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.client = void 0;
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_1 = require("@nestjs/config");
const express_1 = require("express");
const mongodb_1 = require("mongodb");
const host = require("./config/database/databaseConnection");
const config = new config_1.ConfigService();
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(express_1.json({ limit: '10mb' }));
    app.enableCors();
    exports.client = await mongodb_1.MongoClient.connect(host.database().mongodb);
    exports.db = exports.client.db(config.get('mongodb.name'));
    app.listen(config.get('port'));
}
bootstrap();
//# sourceMappingURL=main.js.map