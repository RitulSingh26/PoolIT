import  mongoose  from "mongoose";

const userFileSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  userName: { type: String, required: true },
  fileName:{type:String},
  file: { type: String, required: true }, 
}, { timestamps: true });

const userfile = mongoose.model('UserFile', userFileSchema);

export default userfile;
