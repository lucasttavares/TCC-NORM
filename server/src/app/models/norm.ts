import mongoose from '../../database';
import { Schema } from 'mongoose';
import { NormI } from '../../utils/types';

const NormSchema = new Schema<NormI>({
  title: {
    type: String,
    require: true,
  },
  pdf: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  course: {
    type: String,
    require: true,
  },
  type: {
    type: String,
    require: true,
  },
  date: {
    type: String,
    require: true,
  },
  year: {
    type: String,
  },
});
NormSchema.index(
  { pdf: 'text', title: 'text' },
  { default_language: 'pt', weights: { title: 2, pdf: 1 } },
);
const Norm = mongoose.model('Norm', NormSchema);
export default Norm;
