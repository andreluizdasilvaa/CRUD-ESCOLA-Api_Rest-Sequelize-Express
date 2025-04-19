import bcrypt from "bcryptjs";

export default {
  async up (queryInterface) {
    await queryInterface.bulkInsert(
      'users', 
      [
        {
          nome: 'John Doe',
          email: "john@gmail.com",
          password_hash: await bcrypt.hash('123456', 8),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          nome: 'John Doe1',
          email: "john1@gmail.com",
          password_hash: await bcrypt.hash('123456', 8),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          nome: 'John Doe2',
          email: "john2@gmail.com",
          password_hash: await bcrypt.hash('123456', 8),
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {});
    },

  async down () {}
};

// Para executar: npx sequelize db:seed:all
// Ou se quiser ser mais especifico: npx sequelize db:seed --seed src/database/seeds/20250419040850-cria-usuario.js