import { api } from "../convex/_generated/api.js";
import client from '../utils/convexHook.js'

export const getAbout = async (req, res)=>{
  try {
    // Fetch admin by email using the Convex query
    const data = await client.query(api.about.getAbout)

    res.json({ message: "Fetch successful", data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
}


export const editAbout = async (req, res) => {
    const { name, value } = req.body.data;
    try {
      if(name === 'about' || name === 'vision' || name === 'welcome'){
        const data = {}
        if(name === 'about') data.about = value;
        if(name === 'vision') data.vision = value;
        if(name === 'welcome') data.welcome = value;
        await client.mutation(api.about.patchAbout, data )
        res.status(200).json({message: 'successfull'})
      }else{
        res.status(404).json({message: 'Resource not found'})
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error });
    }
}
