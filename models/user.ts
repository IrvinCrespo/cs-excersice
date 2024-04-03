import {  BelongsToMany, Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript"
import {Sequelize} from 'sequelize'
import UserRelation from "./user-to-user";

@Table
class User extends Model {
    @PrimaryKey
    @Column({
        defaultValue: DataType.UUIDV4,
    })
    id: string;

    @Column
    name: string;

    @Column
    email: string;

    @BelongsToMany(() => User,() => UserRelation, 'userId', 'friendId')
    friends: User[];
}

export default User; 