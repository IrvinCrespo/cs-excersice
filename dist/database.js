"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const user_1 = __importDefault(require("./models/user"));
const path_1 = require("path");
const user_to_user_1 = __importDefault(require("./models/user-to-user"));
const path = (0, path_1.join)(__dirname, '/models/**');
console.log(path);
const sequelize = new sequelize_typescript_1.Sequelize({
    dialect: 'sqlite',
    database: 'main',
    storage: ':memory:',
    models: [user_1.default, user_to_user_1.default],
});
exports.sequelize = sequelize;
//# sourceMappingURL=database.js.map