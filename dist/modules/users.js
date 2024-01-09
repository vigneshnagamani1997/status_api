"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserById = exports.deleteUserById = exports.createUser = exports.removeFollower = exports.addFollower = exports.getUserBySessionToken = exports.getUsersLikeusername = exports.getUserById = exports.getUserByusername = exports.getUserByEmail = exports.getUsers = exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// User Config
const userSchema = new mongoose_1.default.Schema({
    email: { type: String, required: true, index: { unique: true, dropDups: true } },
    username: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    following: { type: [mongoose_1.default.Schema.Types.ObjectId], ref: 'User', default: [] },
    authentication: {
        password: { type: String, required: true, select: false },
        salt: { type: String, select: false },
        sessionToken: { type: String, select: false },
    },
    createdAt: { type: Date, default: Date.now, required: true },
});
exports.UserModel = mongoose_1.default.model('User', userSchema);
// User Actions
const getUsers = () => exports.UserModel.find();
exports.getUsers = getUsers;
const getUserByEmail = (email) => exports.UserModel.findOne({ email });
exports.getUserByEmail = getUserByEmail;
const getUserByusername = (username) => exports.UserModel.findOne({ username });
exports.getUserByusername = getUserByusername;
const getUserById = (id) => exports.UserModel.findById(id);
exports.getUserById = getUserById;
const getUsersLikeusername = (usernameVal) => exports.UserModel.find({ username: { $regex: usernameVal + '.*' } }, { username: 0 });
exports.getUsersLikeusername = getUsersLikeusername;
const getUserBySessionToken = (sessionToken) => exports.UserModel.findOne({ 'authentication.sessionToken': sessionToken });
exports.getUserBySessionToken = getUserBySessionToken;
const addFollower = (username, id) => exports.UserModel.updateOne({ username }, { $addToSet: { following: id } });
exports.addFollower = addFollower;
const removeFollower = (username, id) => exports.UserModel.updateOne({ username }, { $pullAll: { following: [id] } });
exports.removeFollower = removeFollower;
const createUser = (values) => new exports.UserModel(values).save().then((user) => user.toObject());
exports.createUser = createUser;
const deleteUserById = (id) => exports.UserModel.findOneAndDelete({ _id: id });
exports.deleteUserById = deleteUserById;
const updateUserById = (id, values) => exports.UserModel.findByIdAndUpdate(id, values);
exports.updateUserById = updateUserById;
//# sourceMappingURL=users.js.map