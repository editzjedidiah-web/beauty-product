import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/config';

class Booking extends Model {
  public id!: number;
  public userId!: number;
  public serviceId!: number;
  public appointmentDate!: Date;
  public status!: string; // 'pending' | 'confirmed' | 'cancelled' | 'completed'
}

Booking.init({
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  serviceId: { type: DataTypes.INTEGER, allowNull: false },
  appointmentDate: { type: DataTypes.DATE, allowNull: false },
  status: { type: DataTypes.STRING, defaultValue: 'pending' }
}, {
  sequelize,
  modelName: 'booking'
});

export default Booking;
