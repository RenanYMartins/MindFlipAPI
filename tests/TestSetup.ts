import { readFileSync } from 'fs';

const env = readFileSync('.env.test').toString();
const rows = env.split('\n');

for (const line of rows) {
    const [key, value] = line.split('=');
    process.env[key] = value;
}
