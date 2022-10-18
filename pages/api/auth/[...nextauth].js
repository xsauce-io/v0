import NextAuth from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from '../../../lib/mongodb';

const options = {
	//TODO:prod-replace with website base url
	site: process.env.NEXTAUTH_URL,
	adapter: MongoDBAdapter(clientPromise),
	providers: [
		EmailProvider({
			server: {
				port: process.env.EMAIL_SERVER_PORT,
				host: process.env.EMAIL_SERVER_HOST,
				secure: true,
				auth: {
					user: process.env.EMAIL_USERNAME,
					pass: process.env.EMAIL_PASSWORD,
				},
			},
			from: process.env.EMAIL_FROM,
		}),
	],
	database: process.env.DATABASE_URL,
};

export default (req, res) => NextAuth(req, res, options);
