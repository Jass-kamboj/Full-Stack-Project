import mongoose from "mongoose";
import dns from "dns";

dns.setServers(['1.1.1.1','8.8.8.8'])
const connectDb = async() => {
    try{
        await mongoose.connect("mongodb+srv://Jaskaran:Kamboj%4014767@cluster0.jorsa77.mongodb.net/MERN_Project");
        console.log("Database is connected");
    }catch(error){
        console.log(error);
    }
}
export default connectDb;