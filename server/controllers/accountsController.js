import { api } from "../convex/_generated/api.js";
import client from '../utils/convexHook.js'

export const getAccounts = async (req, res)=>{
  try {
    // Fetch admin by email using the Convex query
    // console.log('accounts')
    const data = await client.query(api.accounts.getAllAccounts)

    res.json({ message: "Fetch successful", data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
}

export const createAccount = async(req, res) =>{
    const { name, bank, title, number } = req.body.data;
    try {
        const admin = await client.mutation(api.accounts.createAccount, {number, name, title, bank})
        res.json({message: 'Account created successfully'})
    } catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
}

// export const editAccount = async (req, res) => {
//     const { email, password, username , id} = req.body.data;
//       // Prepare update payload
//       const updatePayload = {};

//       // Add fields to update if provided
//       if (username) updatePayload.username = username;
//       if (email) updatePayload.email = email;
//       // Handle password update with hashing
//       if (password) {
//         //// Hash the new password
//         // const saltRounds = 10;
//         // const hashedPassword = await bcrypt.hash(password, saltRounds);
//         // updatePayload.password = hashedPassword;
//         updatePayload.password = password
//       }
//       if(!id){
//         res.status(402).json({message: 'invalid id'})
//       }
//       updatePayload.id = id
//       try {
//         await client.mutation(api.admins.updateAdmin, {...updatePayload})
//         res.json({message: 'Updated successfully'})
//       } catch (error) {
//         console.error(error);
//         res.status(500).json({ error });
//       }
// }

export const deleteAccount = async (req, res) =>{
  const { id } = req.body.data;
    try {
        await client.mutation(api.accounts.deleteAccount, { id })
        res.json({message: 'Admin deleted successfully'})
    } catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
}