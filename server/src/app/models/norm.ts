import mongoose from 'mongoose';
import { Schema } from 'mongoose';
import { NormI } from '../../utils/types';

const NormSchema = new Schema<NormI>({
    pdf: {
        type: String,
        require: true,
    },
    title: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    type: {
        type: String,
        require: true,
    },
    course: {
        type: String,
        require: true,
    },
});

const Norm = mongoose.model('Norm', NormSchema);
export default Norm;
