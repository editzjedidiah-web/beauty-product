import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/config';

class Wishlist extends Model {
  public id!: number;
  public userId!: number;
  public productId!: number;
}

Wishlist.init({
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  productId: { type: DataTypes.INTEGER, allowNull: false }
}, {
  sequelize,
  modelName: 'wishlist'
});

export default Wishlist;
