import { Client, ClientConfig } from 'pg';
import dotenv from 'dotenv'

dotenv.config({path: './.env'})

const prod : ClientConfig= {
    user: process.env.POSTGRES_USER,
    host: process.env.PGHOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: Number(process.env.DB_PORT)

}
const testing: ClientConfig = {
    user: process.env.POSTGRES_USER,
    host: 'localhost',
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: Number(process.env.DB_PORT)
}
const current = process.env.NODE_ENV=='production'?prod:testing;
const client = new Client(current);
client.connect().catch((e) =>{
        console.error(e)
        process.exit(1)}
    );

export default client;


