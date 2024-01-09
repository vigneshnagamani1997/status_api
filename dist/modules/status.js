"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStatusById = exports.deleteStatusById = exports.createStatus = exports.getNewObjectID = exports.removeComment = exports.addComment = exports.removeLike = exports.addLike = exports.getStatusByposted_by = exports.getStatusMetaDataById = exports.getStatusById = exports.getStatusByEmail = exports.getStatus = exports.statusModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// User Config
const statusSchema = new mongoose_1.default.Schema({
    posted_by: { type: mongoose_1.default.Schema.Types.ObjectId, required: true },
    url: { type: String, required: true },
    likes: { type: [mongoose_1.default.Schema.Types.ObjectId], ref: 'User', default: [], required: true },
    comments: { type: [{
                commented_by: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: true },
                comment: { type: String, required: true },
                createdAt: { type: Date, default: Date.now, required: true },
            }], default: [] },
    createdAt: { type: Date, default: Date.now, required: true },
});
exports.statusModel = mongoose_1.default.model('Status', statusSchema);
// User Actions
const getStatus = () => exports.statusModel.find();
exports.getStatus = getStatus;
const getStatusByEmail = (posted_by) => exports.statusModel.find({ posted_by });
exports.getStatusByEmail = getStatusByEmail;
const getStatusById = (id) => exports.statusModel.findById(id);
exports.getStatusById = getStatusById;
const getStatusMetaDataById = (id) => exports.statusModel.findById({ _id: id }, { likesCount: { $size: "$likes" }, commentsCount: { $size: "$comments" } });
exports.getStatusMetaDataById = getStatusMetaDataById;
const getStatusByposted_by = (arr) => exports.statusModel.find({ posted_by: { $all: [arr] } });
exports.getStatusByposted_by = getStatusByposted_by;
const addLike = (status_id, user_id) => exports.statusModel.updateOne({ _id: status_id }, { $addToSet: { likes: user_id } });
exports.addLike = addLike;
const removeLike = (status_id, user_id) => exports.statusModel.updateOne({ _id: status_id }, { $pullAll: { likes: [user_id] } });
exports.removeLike = removeLike;
const addComment = (status_id, comment) => exports.statusModel.updateOne({ _id: status_id }, { $addToSet: { comments: comment } });
exports.addComment = addComment;
const removeComment = (status_id, comment) => exports.statusModel.updateOne({ _id: status_id }, { $pull: { comments: comment } });
exports.removeComment = removeComment;
const getNewObjectID = () => { return new mongoose_1.default.Types.ObjectId(); };
exports.getNewObjectID = getNewObjectID;
const createStatus = (values) => new exports.statusModel(values).save().then((user) => user.toObject());
exports.createStatus = createStatus;
const deleteStatusById = (id) => exports.statusModel.findOneAndDelete({ _id: id });
exports.deleteStatusById = deleteStatusById;
const updateStatusById = (id, values) => exports.statusModel.findByIdAndUpdate(id, values);
exports.updateStatusById = updateStatusById;
//# sourceMappingURL=status.js.map