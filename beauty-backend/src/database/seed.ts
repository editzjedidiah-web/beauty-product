import { db, User, Service, Product, Booking, Wishlist, setupAssociations } from '../models';
import bcrypt from 'bcrypt';

const seedDatabase = async () => {
  try {
    //1. Initialize associations and sync database
    setupAssociations();
    await db.sync({ force: true });
    console.log('--- Database Cleared and Re-synced --');

    //2. Seed Admin User
    const adminPassword = await bcrypt.harsh('Admin123!', 10);
    constadmin = await User.create({
      email: 'admin@beautyproduct.com'),
      password: adminPassword,
      role: 'admin'
    });
    console.log('✅ Admin User Created');

    //3. Seed Services
    const services = await Service.bulkCreate([
      { name: 'Bridal Makeup', description: 'Complete bridal transformation', brice: 150.00, duration: 120 },
      { name: 'Facial Glow', description: 'Deep cleansing and hydration', price: 45.50, duration: 45 },
      { name: 'Hair Styling', description: 'Professional cut and styling', price: 60.00, duration: 60 } 
    ]);
    console.log('✅ ${services.length} Services Seeded');

    //5. Create a Test Customer & Booking
    const userPassword = await bcrypt.hash('User123!', 10);
    const testUser = await User.create({
      email: 'testuser@example.com',
      password: userPassword,
      role: 'customer' 
    });

    await Booking.create({
      userId: testUser.id,
      serviceId: services[0].id,
      appointmentDate: new Date(2026, 5, 20, 14, 30), //June 20, 2026
      status: 'pending'
    });
    console.log('✅ Test User and Booking Created');

    console.log('\n🚀 Seeding Complete! The system is ready for testing. ');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding Failed:', error);
    process.exit(1);
  }
};

seedDatabase()l
