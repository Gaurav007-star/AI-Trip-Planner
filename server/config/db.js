import mongoose from "mongoose";


const DataBase = async() =>{
    console.log(process.env.MONGO);
    
    try {
        const connection = await mongoose.connect(`${process.env.MONGO}/tripinfo`)
        console.log("Database connection successfull");
    } catch (error) {
        console.log("Data base failed to connect : ",error);
        
    }
}

export default DataBase