import mongoose from "mongoose";

const connection = {};

export async function dbConnect(){

    if(connection.isConnected){

        return;
    }

    const db = await mongoose.connect(process.env.MONGO_URL,{
useNewUrlParser: true,
useUnifiedTopology: true

    })

    connection.isConnected = db.connection.readyState

    switch (connection.isConnected) {
        case 0 :
          console.log("MongoDB is disconnected");
          break;
        case 1:
          console.log("MongoDB is connected");
          break;
          case 2:
            console.log("MongoDB is connecting");
            break;
            case 3:
                console.log("MongoDB is disconnecting");
                break;
                case 99:
                console.log("MongoDB is uninitialized");
                break;
        default:
          console.log("Unknown Status");
      }

}

export default dbConnect;