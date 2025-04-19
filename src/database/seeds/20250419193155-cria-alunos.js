export default {
  async up (queryInterface) {
    await queryInterface.bulkInsert(
      'alunos',
      [
        {
          nome: 'Aluno Um',
          sobrenome: 'Silva',
          email: 'aluno1@email.com',
          idade: 20,
          peso: 70.5,
          altura: 1.75,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          nome: 'Aluno Dois',
          sobrenome: 'Souza',
          email: 'aluno2@email.com',
          idade: 22,
          peso: 80.2,
          altura: 1.80,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          nome: 'Aluno Três',
          sobrenome: 'Oliveira',
          email: 'aluno3@email.com',
          idade: 19,
          peso: 65.0,
          altura: 1.68,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down (queryInterface) {
    await queryInterface.bulkDelete('alunos', null, {});
  }
};