const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class User extends Model {
  public id!: number;
  public username!: string;
  public password!: string;
  public sessionToken!: string | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sessionToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'users',
  }
);
sequelize.sync({ force: false }) // Sync models with the database
  .then(() => {
    console.log('Database synchronized');
  })
  .catch((error:any) => {
    console.error('Error syncing the database:', error);
  });

export default User;
