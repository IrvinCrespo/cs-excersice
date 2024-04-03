import {  Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript"
import User from "./user";

@Table
class UserRelation extends Model {
    @Column
    @ForeignKey(() => User)
    userId: string;

    @Column
    @ForeignKey(() => User)
    friendId: string;
}

export default UserRelation; 