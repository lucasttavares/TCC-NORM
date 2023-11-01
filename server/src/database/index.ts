import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/norm');
mongoose.Promise = global.Promise;

export default mongoose;
