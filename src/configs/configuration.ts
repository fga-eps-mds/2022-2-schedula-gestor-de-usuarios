/*Configuração padrão em relação ao banco de dados e o ambiente*/
export default () => ({
  database: {
    host: 'postgres',
    user: 'postgres',
    pass: 'postgres',
    db: 'schedula_user',
    address: 'schedula_user_db',
    port: 5105,
  },
  environment: 'DEVELOPMENT',
});
