import  express from 'express';
import  session from 'express-session';
import  jwt from 'jsonwebtoken';
import  bodyParser from 'body-parser';
import  multer from 'multer';
import  cors from 'cors';
import { api } from "./convex/_generated/api.js";
import * as dotenv from "dotenv";
import validator from 'validator'
import bcrypt from 'bcrypt'
import fs from 'fs/promises';
import routes from './routes/index.js'
import client from './utils/convexHook.js';

dotenv.config({ path: ".env.local" });
dotenv.config()

const app = express();
app.use(cors())
const port = 3000;
// Middleware for parsing JSON data
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
);
// Middleware for parsing JSON bodies
app.use(bodyParser.json());

// hash password
const hashPassword = async (plainPassword) => {
  const saltRounds = 10;
  return await bcrypt.hash(plainPassword, saltRounds);
};

const checkSession = (req, res, next) => {
  const token_set = req.body.headers.Authorization
  const token = token_set.split('"')
  
  try {
    const decoded = jwt.verify(token[1], process.env.SESSION_SECRET);
    // console.log(decoded)  
    next()  
  } catch (err) {
    console.log(err.name)
    res.status(401).json({ message: 'Invalid token' , name: err.name, err});
  }
};

// '/profile' route to get data
app.get('/profile', (req, res) => {
  if (!req.auth) {
    return res.status(401).send('Unauthorized');
  }

  const profileData = {
    name: 'John Doe',
    age: 30,
    email: 'johndoe@example.com'
  };
  res.json(profileData);
});


// API Routes
app.use('/api', routes);

// Health check route
app.get('/health', (req, res) => res.send('API is healthy'));

// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
