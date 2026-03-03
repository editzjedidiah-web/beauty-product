import User from './User';
// We will import Service, Product, Booking, and Wishlist here as we create them

const setupAssociations = () => {
  // Example: A User has many Bookings
  // User.hasMany(Booking, { foreignKey: 'userId' });
  // Booking.belongsTo(User, { foreignKey: 'userId' });
  
  // Example: A User has many Wishlist items
  // User.hasMany(Wishlist, { foreignKey: 'userId' });
  // Wishlist.belongsTo(User, { foreignKey: 'userId' });
};

export { sequelize as db, User, setupAssociations };
