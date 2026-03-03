import { DatTypes, Model } from 'sequelize';
import sequelize from '../database/config';

class Service extends Model {
  public id!: number;
  public name!: string;
  public description!: string;
  public price!: number;
  public duration!: number; //Duration in  minutes 
}

Service.init({
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  price: {type: DataTypes.DECIMAL(10, 2), allowNull: false },
  duration: {type: DataTypes.INTEGER, allowNull: false }, 
}, {
  sequelize, 
  modelName: 'service' 
});

export default Service;
