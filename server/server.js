const express = require('express');
const session = require('express-session');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors');
require('dotenv').config();

const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY
// Supabase configuration
const supabase = createClient(supabaseUrl, supabaseKey);

const app = express();
app.use(cors())
const port = 3000;
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
);
// Middleware for parsing JSON bodies
app.use(bodyParser.json());

// Clerk middleware to verify tokens
// app.use(ClerkExpressWithAuth({
//   audience: 'your-clerk-audience-id',
//   issuer: 'your-clerk-issuer-id'
// }));

// '/' route to check for token validity
app.get('/', (req, res) => {
  // if (req.auth) {
  //   res.send('Token is valid');
  // } else {
  //   res.status(401).send('Invalid token');
  // }
  console.log('triggerd')
  res.json({'success': 200})
});
app.post('/admins', async (req, res)=>{
  console.log(req.body)
  res.status(200)
  // signin
const { data, error } = await supabase.auth.signInWithPassword({
    email: req.body.email,
    password: req.body.password,
})


// app.get('/', (req, res) => {
//   const token = req.cookies.jwt;
//   if (!token) {
//     return res.status(401).json({ message: 'Not authenticated' });
//   }
// 
//   try {
//     const decoded = jwt.verify(token, process.env.SESSION_SECRET);
//     res.status(200).json({ message: `Hello, user with email: ${decoded.email}` });
//   } catch (err) {
//     res.status(401).json({ message: 'Invalid token' });
//   }
// });
// 

// app.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   const { session, error } = await supabase.auth.signIn({ email, password });
// 
//   if (error) {
//     return res.status(400).json({ error: error.message });
//   }
// 
//   const token = jwt.sign({ user_id: session.user.id, email: session.user.email }, process.env.SESSION_SECRET, {
//     expiresIn: '1h'
//   });
// 
//   res.cookie('jwt', token, { httpOnly: true });
//   res.status(200).json({ message: 'Login successful', token });
// });
// 
// app.post('/logout', (req, res) => {
//   res.clearCookie('jwt');
//   res.status(200).json({ message: 'Logout successful' });
// });

// app.post('/signup', async (req, res) => {
//   const { email, password } = req.body;
//   const { user, error } = await supabase.auth.signUp({ email, password });
// 
//   if (error) {
//     return res.status(400).json({ error: error.message });
//   }
// 
//   res.status(200).json({ message: 'User signed up successfully', user });
// });






  // // new password mail

// const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
//   redirectTo: 'https://example.com/update-password',
// })

  // set new password
//   const { data, error } = await supabase.auth.updateUser({
//   password: new_password
// })

  // create new admin
  // const { data, error } = await supabase.auth.signUp({
  //   email: req.body.email,
  //   password: req.body.password,
  // })
  console.log(data)
  res.send(data)
})
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

// Multer setup for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

let uploadedImages = [];

// '/gallery' route to receive images
app.post('/gallery', upload.array('images'), (req, res) => {
  if (!req.auth) {
    return res.status(401).send('Unauthorized');
  }

  uploadedImages = req.files;
  res.send('Images received');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
