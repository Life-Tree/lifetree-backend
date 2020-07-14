"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    mongodb: {
        password: process.env.DATABASE_PASSWORD,
        name: process.env.DATABASE_NAME,
        user: process.env.DATABASE_USER
    },
});
//# sourceMappingURL=configuration.js.map