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
exports.seedUsers = void 0;
const user_1 = __importDefault(require("../models/user"));
const seedUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = [{
            name: 'Harry Potter',
            email: 'harry@howarts.com',
            friends: []
        }, {
            name: 'Ron Weasley',
            email: 'ron@howarts.com',
            friends: []
        }, {
            name: 'Hermione Granger',
            email: 'hermione@howarts.com',
            friends: []
        }, {
            name: 'Albus Dumbledor',
            email: 'albus@howarts.com',
            friends: []
        }, {
            name: 'Rubeus Hagrid',
            email: 'rubeus@howarts.com',
            friends: []
        }, {
            name: 'Draco Malfoy',
            email: 'draco@howarts.com',
            friends: []
        },];
    const usersResult = yield user_1.default.bulkCreate(users, { include: [{
                model: user_1.default,
                as: 'friends'
            }] });
    // Create friends relationships
    const harry = usersResult[0];
    const ron = usersResult[1];
    const hermione = usersResult[2];
    const albus = usersResult[3];
    harry.$add('friends', ron);
    ron.$add('friend', [hermione, albus]);
    hermione.$add('friends', albus);
    albus.$add('friends', ron);
    yield harry.save();
    yield ron.save();
    yield hermione.save();
});
exports.seedUsers = seedUsers;
//# sourceMappingURL=seed-users.js.map