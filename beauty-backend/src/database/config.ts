import { Sequelize } from 'sequilize';
import path from 'path';
//This points to the /server/database.sqlite file 
const sequelize = Sequelize({
  dialect; 'sqlite',
  storage: path.join(__dirname, '../../server/database.sqlite'),
  logging: false, //Set to console.log if you want to see raw SQL queries
}), 

  export default sequelize; 
