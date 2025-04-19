import dotenv from 'dotenv';
dotenv.config();

export default {
  async up (queryInterface, Sequelize) {
      await queryInterface.createTable('fotos', {
         id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
        },
        originalname: {
          type: Sequelize.STRING,
          allowNull: false
        },
        filename: {
          type: Sequelize.STRING,
          allowNull: false
        },
        aluno_id: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            model: 'alunos',
            key: 'id',
          },
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE',
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false
        }
      })
  },

  async down (queryInterface) {
    await queryInterface.dropTable('fotos');
  }
}