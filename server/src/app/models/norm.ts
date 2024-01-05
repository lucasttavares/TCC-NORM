import mongoose from '../../database';
import { Schema } from 'mongoose';
import { NormI } from '../../utils/types';

const NormSchema = new Schema<NormI>({
  title: {
    type: String,
    require: true,
  },
  diacriticTitle: {
    type: String,
    required: true,
  },
  pathFile: {
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
    type: Date,
    require: true,
  },
  year: {
    type: Number,
  },
});
NormSchema.index(
  { title: 'text', pdf: 'text' },
  { default_language: 'pt', weights: { title: 10, pdf: 5 } },
);
const Norm = mongoose.model('Norm', NormSchema);
export default Norm;
