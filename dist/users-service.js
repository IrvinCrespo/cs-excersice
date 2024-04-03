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
exports.usersMap = exports.deepRelationSearch = void 0;
const user_1 = __importDefault(require("./models/user"));
// Finds the distance between 2 users, uses BFS to explore users relations
// return 0 if user 1 is equels to user 2 (same user)
// return depth > 0 if there is relation
// return -1 if no relation found
const deepRelationSearch = (userId1, userId2) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield (0, exports.usersMap)();
    const queue = [{ userId: userId1, depth: 0 }];
    const visitedUsers = new Set();
    if (!userId1 || !userId2) {
        return -1;
    }
    while (queue.length) {
        const { userId, depth } = queue.shift();
        const user = users.get(userId);
        visitedUsers.add(userId);
        if (user.id === userId2) {
            return depth;
        }
        const { friends } = user;
        for (const friend of friends) {
            if (!visitedUsers.has(friend.id)) {
                queue.push({ userId: friend.id, depth: depth + 1 });
            }
        }
    }
    return -1;
});
exports.deepRelationSearch = deepRelationSearch;
// Hash map all users
const usersMap = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_1.default.findAll({ include: [user_1.default] });
    const userMap = new Map();
    for (const user of users) {
        userMap.set(user.id, user);
    }
    return userMap;
});
exports.usersMap = usersMap;
//# sourceMappingURL=users-service.js.map