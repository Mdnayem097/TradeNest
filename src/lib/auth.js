import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db("TradeNest");

export const auth = betterAuth({
  database: mongodbAdapter(db, { client }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
  user: {
    additionalFields: {
      role: {
        defaultValue: "buyer"
      },
      Plan: {
        defaultValue: "free"
      }
    }
  },
  session: {
    cookieCache: {
      enabled: true,
      strategy: 'jwt',
      maxAge: 60 * 24 * 30,
    }
  },
  plugins: [
    jwt()
  ]
});