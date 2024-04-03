import User from "../models/user";


export const seedUsers = async () => {

    const users = [{
        name: 'Harry Potter',
        email: 'harry@howarts.com',
        friends: []
    },{
        name: 'Ron Weasley',
        email: 'ron@howarts.com',
        friends: []
    },{
        name: 'Hermione Granger',
        email: 'hermione@howarts.com',
        friends: []
    },{
        name: 'Albus Dumbledor',
        email: 'albus@howarts.com',
        friends: []
    },{
        name: 'Rubeus Hagrid',
        email: 'rubeus@howarts.com',
        friends: []
    },{
        name: 'Draco Malfoy',
        email: 'draco@howarts.com',
        friends: []
    },];

    const usersResult = await User.bulkCreate(users, {include: [{
        model: User,
        as: 'friends'
    }]});

    // Create friends relationships
    const harry = usersResult[0];
    const ron = usersResult[1];
    const hermione = usersResult[2];
    const albus = usersResult[3];
 
    harry.$add('friends', ron);
    ron.$add('friend', [hermione, albus]);
    hermione.$add('friends', albus);
    albus.$add('friends', ron);

    await harry.save();
    await ron.save();
    await hermione.save();
}