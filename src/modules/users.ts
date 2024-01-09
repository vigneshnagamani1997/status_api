import mongoose from 'mongoose';

// User Config
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, index: {unique: true, dropDups: true} },
  username: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  following: { type: [mongoose.Schema.Types.ObjectId], ref : 'User', default: [] },
  authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
  },
  createdAt: { type: Date, default: Date.now ,required: true },
});

export const UserModel = mongoose.model('User', userSchema);

// User Actions
export const getUsers = () => UserModel.find();
export const getUserByEmail = (email: string) => UserModel.findOne({ email });
export const getUserByusername = (username: string) => UserModel.findOne({ username });
export const getUserById = (id: string) => UserModel.findById(id);
export const getUsersLikeusername = (usernameVal: string) => UserModel.find({ username: { $regex: usernameVal + '.*' } }, {username:0});
export const getUserBySessionToken = (sessionToken: string) => UserModel.findOne({ 'authentication.sessionToken': sessionToken });
export const addFollower = (username: string, id:string) => UserModel.updateOne({ username },{ $addToSet: { following: id } });
export const removeFollower = (username: string, id:string) => UserModel.updateOne({ username },{ $pullAll: { following:  [id] } });

export const createUser = (values: Record<string, any>) => new UserModel(values).save().then((user) => user.toObject());
export const deleteUserById = (id: string) => UserModel.findOneAndDelete({ _id: id });
export const updateUserById = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values);
