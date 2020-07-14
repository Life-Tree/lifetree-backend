"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.database = void 0;
function database() {
    return {
        mongodb: `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_Password}@dblifetree-pn1er.gcp.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`
    };
}
exports.database = database;
//# sourceMappingURL=databaseConnection.js.map