import User from './User';
import Service from './Service';
import Product from './Product';
import Booking from './Booking';
import Wishlist from './Wishlist';

const setupAssociations = () => {
  // User <-> Booking <-> Service
  User.hasMany(Booking, { foreignKey: 'userId' });
  Booking.belongsTo(User, { foreignKey: 'userId' });

  Service.hasMany(Booking, { foreignKey: 'serviceId' });
  Booking.belongsTo(Service, { foreignKey: 'serviceId' });

  // User <-> Wishlist <-> Product
  User.hasMany(Wishlist, { foreignKey: 'userId' });
  Wishlist.belongsTo(User, { foreignKey: 'userId' });

  Product.hasMany(Wishlist, { foreignKey: 'productId' });
  Wishlist.belongsTo(Product, { foreignKey: 'productId' });
};

export { User, Service, Product, Booking, Wishlist, setupAssociations };
