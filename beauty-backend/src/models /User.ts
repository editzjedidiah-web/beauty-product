import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/config';
import bcrypt from 'bcrypt';

class User extends Model {
  public id!: number;
  public email!: string;
  public password!: string;
  public role!: string; // 'admin' or 'customer'

  // Helper method to validate password
  public async comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}

User.init({
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true, allowNull: false, validate: { isEmail: true } },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.STRING, defaultValue: 'customer' }
}, {
  sequelize,
  modelName: 'user',
  hooks: {
    beforeCreate: async (user: User) => {
      user.password = await bcrypt.hash(user.password, 10);
    }
  }
});

export default User;
