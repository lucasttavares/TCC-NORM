import { NormI } from '../../../utils/types';
import 'dotenv/config';

export default class NormView {
  public static singleNormView(norm: NormI) {
    return {
      _id: norm._id,
      link: `http://localhost:${process.env.PORT}/${norm.pathFile}`,
      title: norm.title,
      description: norm.description,
      type: norm.type,
      course: norm.course,
      date: norm.date,
    };
  }
  public static manyNormView(norms: NormI[]) {
    return norms.map(norm => {
      return this.singleNormView(norm);
    });
  }
}
