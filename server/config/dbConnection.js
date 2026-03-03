import mongoose from "mongoose";

/**
 * @Connects to MongoDB database
 */
mongoose.set('strictQuery', false);

const connectionToDB= async () => {

    try {
        const{ connection}= await mongoose.connect(
            process.env.MONGO_URL||`mongodb://localhost:127.0.0.1:27017/`
        );
    
        if(connection){
            console.log(`Connected to MongoDB :${connection.host}`);
        }

    } catch (e) {
        console.log(e);
        process.exit(1);
    } 
}
export default connectionToDB;