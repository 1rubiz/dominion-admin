import { api } from "../convex/_generated/api.js";
import client from '../utils/convexHook.js'
import * as dotenv from "dotenv";
import bcrypt from 'bcrypt'

dotenv.config()

export const getAdmins = async (req, res)=>{
  try {
    // Fetch admin by email using the Convex query
    const admin = await client.query(api.admins.getAllAdmins)

    res.json({ message: "Fetch successful", admins: admin });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
}

let storeToken = ''
function generate () {
  return Math.floor(100000 + Math.random() * 900000);
}

// hash password
const hashPassword = async (plainPassword) => {
  const saltRounds = 10;
  return await bcrypt.hash(plainPassword, saltRounds);
};

export const logAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Fetch admin by email using the Convex query
    const admin = await client.query(api.admins.findByEmail, { email, password });

    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }

    // // Validate the password
    const isValid = await bcrypt.compare(password, admin.password);

    if (!isValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // console.log(admin)
    const rando  = generate()
    const str = rando + admin.id
    const token = jwt.sign({ user_id: str, email: admin.email }, process.env.SESSION_SECRET, {
      expiresIn: '1h'
    });

    storeToken = token;
    // Successful login
    res.json({ message: "Login successful", admin });
  } catch (error) {
    console.error('line105',error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export const validateAdmin = async (req, res) => {
  console.log('resquesting token')
  if(storeToken){
    setTimeout(()=>{
      storeToken=''
    }, 5000)
    res.status(200).json({ message: 'Login successful', token: storeToken });
  }else {
    res.status(401).json({message: 'Error Credentials'})
  }
}

export const createAdmin = async(req, res) =>{
    const { username, password, email } = req.body.data;
    try {
        // Hash the password before storing
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const admin = await client.mutation(api.admins.createAdmin, {email, password: hashedPassword, username})
        res.json({message: 'Admin created successfully'})
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error instanceof Error ? error.message : 'Server error' });
    }
}

export const editAdmin = async (req, res) => {
    const { email, password, username , id} = req.body.data;

      if(!id){
        res.status(402).json({message: 'invalid id'})
      }

      let saltedPassword;
      if(password){
        saltedPassword = await hashPassword(password);
      }
      try {
        await client.mutation(api.admins.updateAdmin, {
          id: id,
          ...(username && { username }),
          ...(email && { email }),
          ...(password && { saltedPassword })
        });

        res.json({ message: 'Admin updated successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error });
      }
}

export const deleteAdmin = async (req, res) =>{
  const { id } = req.body.data;
    try {
        await client.mutation(api.admins.deleteAdmin, { id })
        res.json({message: 'Admin deleted successfully'})
    } catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
}
 
// export default { getAdmins, createAdmin, editAdmin, deleteAdmin }
// module.exports = { getAdmins, createAdmin, editAdmin, deleteAdmin };