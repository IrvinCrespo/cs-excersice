import express from 'express';
import User from './models/user';
import { sequelize } from './database';
import bodyParser from 'body-parser';
import { seedUsers } from './seeders/seed-users';
import { deepRelationSearch } from './users-service';

const app = express();
const port = 3000;
app.use(bodyParser.json());

sequelize.sync().then(() => {
  seedUsers();
});

// Get all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll({
      include:[User]
    });
    return res.json({ result: users });
  } catch (error) {
    return res.status(400).json({ error })
  }
});

// Get a user by id
app.get('/users/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findOne({ where: {id} });
    return res.json({ result: user });
  } catch (error) {
    return res.status(400).json({ error });
  }
});

// Update user's data (name and/or email)
app.patch('/users/:userId', async (req, res) => {
  const { name, email } = req.body;
  const { userId } = req.params;
  try {

    if (!email && !name) {
      return res.status(400).json({ error: 'Name and/or Email must be provided to update' });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (email && email !== user.email) {
      user.set('email', email);
    }

    if (name && name !== user.name){
       user.set('name', name);
    }
    await user.save();
    return res.send({ result: user });
  } catch (error) {
    return res.status(400).send({ error });
  }
})

// Create new user
// Params: name, email.
app.post('/users', async (req, res) => {
  try {
    const {name, email} = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and Email are required to create user' });
    }
    const newUser = await User.create({ name, email });
    return res.send({result: newUser});
  } catch (error) {
    return res.status(400).send({ error });
  }
});

// Add new friend to specific user.
app.post('/users/friends/:userId/:friendId', async (req, res) => {
  try {
    const {userId, friendId} = req.params;
    let user = await User.findByPk(userId, {include: [User]});
    const friend = await User.findByPk(friendId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!friend) {
      return res.status(404).json({ error: 'Friend not found' });
    }

    user.$add('friends',friend)
    await user.save({ returning: true });
    user = await user.reload()
    return res.send({ result: user });
  } catch (error) {
    return res.status(400).send({
      error
    });
  }
  
});

app.delete('/users/friends/:userId/:friendId', async (req, res) => {
  try {
    const {userId, friendId} = req.params;
    let user = await User.findByPk(userId, {include: [User]});
    const friend = await User.findByPk(friendId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!friend) {
      return res.send({ result: user });
    }

    user.$remove('friends', friend);
    await user.save();
    user = await user.reload()
    return res.send({ result: user });
  } catch (error) {
    return res.status(400).send({
      error
    }); 
  }
})

app.delete('/users/:userId', async (req, res) => {
  try {
    const {userId} = req.params;
    const user = await User.findByPk(userId, {include: [User]});
    const result = await user.destroy();
    return res.send({ result });
  } catch (error) {
    return res.status(400).send({
      error
    }); 
  }
})

app.get('/users/distance/:userId/:userId2', async (req, res) => {
  try {
    const {userId, userId2} = req.params;
    const depth = await deepRelationSearch(userId, userId2);
    return res.send({ distance: depth });
  } catch (error) {
    return res.status(400).send({
      error
    }); 
  }
  
})

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});