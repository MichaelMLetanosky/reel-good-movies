const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  //await INSERT SEED FUNCTION HERE
 
  process.exit(0);
};

seedAll();
