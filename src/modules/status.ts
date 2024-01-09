import mongoose from 'mongoose';

// User Config
const statusSchema = new mongoose.Schema({
  posted_by: { type: mongoose.Schema.Types.ObjectId, required: true },
  url: { type: String, required: true },
  likes: { type: [mongoose.Schema.Types.ObjectId], ref : 'User', default: [] ,required: true },
  comments: { type: [{
    commented_by: { type: mongoose.Schema.Types.ObjectId, ref : 'User', required: true },
    comment: { type: String, required: true }, 
    createdAt: { type: Date, default: Date.now ,required: true },
  }], default: [] },
  createdAt: { type: Date, default: Date.now ,required: true },
});

export const statusModel = mongoose.model('Status', statusSchema);

// User Actions
export const getStatus = () => statusModel.find();
export const getStatusByEmail = (posted_by: string) => statusModel.find({ posted_by });
export const getStatusById = (id: string) => statusModel.findById(id);
export const getStatusMetaDataById = (id: string) => statusModel.findById({_id:id},{ likesCount: { $size: "$likes" }, commentsCount: { $size: "$comments" } });
export const getStatusByposted_by = (arr: any) =>  statusModel.find( {posted_by: { $all: [arr] }} );
export const addLike = (status_id: string, user_id:string) => statusModel.updateOne({ _id: status_id },{ $addToSet: { likes: user_id } });
export const removeLike = (status_id: string, user_id:string) => statusModel.updateOne({ _id: status_id },{ $pullAll: { likes:  [user_id] } });

export const addComment = (status_id: string, comment:any) => statusModel.updateOne({ _id: status_id },{ $addToSet: { comments: comment } });
export const removeComment = (status_id: string, comment:any) => statusModel.updateOne({ _id: status_id },{ $pull: { comments:  comment } });


export const getNewObjectID = ()=> { return new mongoose.Types.ObjectId(); }
export const createStatus = (values: Record<string, any>) => new statusModel(values).save().then((user) => user.toObject());
export const deleteStatusById = (id: string) => statusModel.findOneAndDelete({ _id: id });
export const updateStatusById = (id: string, values: Record<string, any>) => statusModel.findByIdAndUpdate(id, values);
