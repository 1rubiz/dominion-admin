import { ConvexHttpClient } from "convex/browser";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
const client = new ConvexHttpClient(process.env["CONVEX_URL"]);

export default client;