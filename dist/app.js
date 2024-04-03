"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("./models/user"));
const database_1 = require("./database");
const body_parser_1 = __importDefault(require("body-parser"));
const seed_users_1 = require("./seeders/seed-users");
const users_service_1 = require("./users-service");
const app = (0, express_1.default)();
const port = 3000;
app.use(body_parser_1.default.json());
database_1.sequelize.sync().then(() => {
    (0, seed_users_1.seedUsers)();
});
// Get all users
app.get('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_1.default.findAll({
            include: [user_1.default]
        });
        return res.json({ result: users });
    }
    catch (error) {
        return res.status(400).json({ error });
    }
}));
// Get a user by id
app.get('/users/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const user = yield user_1.default.findOne({ where: { id } });
        return res.json({ result: user });
    }
    catch (error) {
        return res.status(400).json({ error });
    }
}));
// Update user's data (name and/or email)
app.patch('/users/:userId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email } = req.body;
    const { userId } = req.params;
    try {
        if (!email && !name) {
            return res.status(400).json({ error: 'Name and/or Email must be provided to update' });
        }
        const user = yield user_1.default.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        if (email && email !== user.email) {
            user.set('email', email);
        }
        if (name && name !== user.name) {
            user.set('name', name);
        }
        yield user.save();
        return res.send({ result: user });
    }
    catch (error) {
        return res.status(400).send({ error });
    }
}));
// Create new user
// Params: name, email.
app.post('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email } = req.body;
        if (!name || !email) {
            return res.status(400).json({ error: 'Name and Email are required to create user' });
        }
        const newUser = yield user_1.default.create({ name, email });
        return res.send({ result: newUser });
    }
    catch (error) {
        return res.status(400).send({ error });
    }
}));
// Add new friend to specific user.
app.post('/users/friends/:userId/:friendId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, friendId } = req.params;
        let user = yield user_1.default.findByPk(userId, { include: [user_1.default] });
        const friend = yield user_1.default.findByPk(friendId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        if (!friend) {
            return res.status(404).json({ error: 'Friend not found' });
        }
        user.$add('friends', friend);
        yield user.save({ returning: true });
        user = yield user.reload();
        return res.send({ result: user });
    }
    catch (error) {
        return res.status(400).send({
            error
        });
    }
}));
app.delete('/users/friends/:userId/:friendId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, friendId } = req.params;
        let user = yield user_1.default.findByPk(userId, { include: [user_1.default] });
        const friend = yield user_1.default.findByPk(friendId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        if (!friend) {
            return res.send({ result: user });
        }
        user.$remove('friends', friend);
        yield user.save();
        user = yield user.reload();
        return res.send({ result: user });
    }
    catch (error) {
        return res.status(400).send({
            error
        });
    }
}));
app.delete('/users/:userId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const user = yield user_1.default.findByPk(userId, { include: [user_1.default] });
        const result = yield user.destroy();
        return res.send({ result });
    }
    catch (error) {
        return res.status(400).send({
            error
        });
    }
}));
app.get('/users/distance/:userId/:userId2', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, userId2 } = req.params;
        const depth = yield (0, users_service_1.deepRelationSearch)(userId, userId2);
        return res.send({ distance: depth });
    }
    catch (error) {
        return res.status(400).send({
            error
        });
    }
}));
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
//# sourceMappingURL=app.js.map