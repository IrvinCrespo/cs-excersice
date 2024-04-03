import User from "./models/user"

// Finds the distance between 2 users, uses BFS to explore users relations
// return 0 if user 1 is equels to user 2 (same user)
// return depth > 0 if there is relation
// return -1 if no relation found
export const deepRelationSearch = async (userId1: string, userId2: string) => {
    const users = await usersMap();
    const queue = [{userId: userId1, depth: 0 }]

    const visitedUsers = new Set();

    if (!userId1 || !userId2) {
        return -1;
    }

    while(queue.length) {
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
}

// Hash map all users
export const usersMap = async () => {
    const users = await User.findAll({include: [User]});
    const userMap = new Map<string, User>();
    for (const user of users) {
        userMap.set(user.id, user);
    }
    return userMap;
}