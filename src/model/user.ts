import mongoose,{Schema} from "mongoose";
import { Space } from "./space";

const userSchema = new Schema({
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true,
        match:[/.+\@.+\..+/,'please use a valid email address']
    },
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        default:"https://w7.pngwing.com/pngs/831/88/png-transparent-user-profile-computer-icons-user-interface-mystique-miscellaneous-user-interface-design-smile-thumbnail.png"
    },
    spaces:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Space'
        }
    ]
})

const UserModel = mongoose.models.User || mongoose.model('User', userSchema);

export default UserModel;