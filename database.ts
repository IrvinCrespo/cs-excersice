import { Sequelize } from 'sequelize-typescript';
import User from './models/user';
import { join } from "path";
import UserRelation from './models/user-to-user';

const path = join(__dirname, '/models/**')
console.log(path)

const sequelize: Sequelize = new Sequelize({
  dialect: 'sqlite',
  database: 'main',
  storage: ':memory:',
  models: [User, UserRelation],
});

export { sequelize };