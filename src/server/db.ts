import mariadb from 'mariadb';

export const db = mariadb.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  port: Number(process.env.DB_PORT || 3306),
  database: process.env.DB_NAME || 'nyotaone_db',
  user: process.env.DB_USER || 'nyotaone_app',
  password: process.env.DB_PASSWORD || '',
  connectionLimit: 5,
  acquireTimeout: 10000,
  charset: 'utf8mb4',
  bigIntAsNumber: true,
});

export async function testDatabaseConnection(): Promise<void> {
  let connection;

  try {
    connection = await db.getConnection();
    await connection.query('SELECT 1 AS connected');
    console.log('MariaDB connection successful');
  } finally {
    connection?.release();
  }
}