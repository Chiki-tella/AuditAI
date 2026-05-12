const { Pool, neonConfig } = require('@neondatabase/serverless');
const { PrismaNeon } = require('@prisma/adapter-neon');
const { PrismaClient } = require('@prisma/client');
const ws = require('ws');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();
neonConfig.webSocketConstructor = ws;

// Manual parsing to ensure compatibility
const connectionString = process.env.DATABASE_URL;
const url = new URL(connectionString);

const poolConfig = {
  host: url.hostname,
  user: url.username,
  password: url.password,
  database: url.pathname.substring(1),
  port: parseInt(url.port || '5432'),
  ssl: true
};

console.log('--- Connecting to:', poolConfig.host, '---');

const pool = new Pool(poolConfig); 
const adapter = new PrismaNeon(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('--- Seeding Database ---');
  
  const pass = await bcrypt.hash('12345678', 10);
  
  try {
    // 1. Create Firm
    const firm = await prisma.firm.create({
      data: {
        name: 'Test Firm',
        scansLimit: 10
      }
    });
    console.log('✅ Firm created:', firm.id);

    // 2. Create Admin User
    const user = await prisma.user.create({
      data: {
        email: 'test@example.com',
        name: 'Test Admin',
        passwordHash: pass,
        role: 'ADMIN',
        firmId: firm.id
      }
    });
    console.log('✅ User created: test@example.com / 12345678');

  } catch (e) {
    console.error('❌ Error during seeding:');
    console.error(e);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

main();
