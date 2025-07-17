import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
// import { neonConfig } from '@neondatabase/serverless';
// import ws from 'ws';

// Enable WebSocket for Neon
// neonConfig.webSocketConstructor = ws;

// Load DB URL
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
    throw new Error('❌ DATABASE_URL is not defined in environment variables');
}

// Use PrismaNeon adapter with your DB URL
const adapter = new PrismaNeon({ connectionString });

// Create a new PrismaClient using the Neon adapter
const prisma = new PrismaClient({ adapter });

// Export the Prisma client
export default prisma;
