import { Request, Response } from 'express';
import pdfParse from 'pdf-parse';
import Norm from '../models/norm';
import { diacriticRegex } from '../../utils/diacritic-regex';
import * as fs from 'fs';
import NormView from '../models/view/normView';

export const postNorm = async (request: Request, response: Response) => {
  const pdf = request.file;
  const { title, description, type, course, date } = request.body;
  const blobFile = fs.readFileSync(pdf!.path);

  pdfParse(blobFile)
    .then(data => {
      const norm = new Norm({
        pathFile: pdf?.path,
        title,
        pdf: diacriticRegex(data.text),
        description,
        course,
        type,
        date,
      });
      norm.year = new Date(date).getFullYear();
      norm.diacriticTitle = diacriticRegex(title);
      norm.save();
      console.log(norm);
      return response.status(200).send(norm);
    })
    .catch(err => {
      console.log(err);
      response.status(400).send(err);
    });
};

export const getNorms = async (request: Request, response: Response) => {
  try {
    const norms = await Norm.find().sort({ date: -1 });
    response.status(200).send(NormView.manyNormView(norms));
  } catch (err) {
    console.log(err);
    response.status(500).json({ error: 'Erro ao encontrar' });
  }
};

export const updateNorm = async (request: Request, response: Response) => {
  const norm = request.body;

  try {
    const updatedNorm = await Norm.findByIdAndUpdate(norm._id, norm);

    if (!updatedNorm) {
      console.log(norm);
      return response.status(404).send({ error: 'Norm not Found' });
    }

    return response.status(200).send('OK');
  } catch (err) {
    console.log(err);
  }
};

export const deleteNorm = async (request: Request, response: Response) => {
  const id = request.params.id;
  try {
    const deletedNorm = await Norm.findByIdAndDelete(id);

    if (!deletedNorm) {
      return response.status(404).send({ error: 'Norm not Found' });
    }

    return response.status(200).send('OK');
  } catch (err) {
    console.log(err);
  }
};

export const searchNorm = async (request: Request, response: Response) => {
  const searchPdf = request.params.term;
  const searchTitle = request.params.term;
  const { year, type, course } = request.query;

  try {
    const query: any = {
      $text: {
        $search: `${searchTitle}${searchPdf}`,
        $caseSensitive: false,
        $diacriticSensitive: false,
      },
    };

    let regexQuery: any = {};

    if (year) {
      query.year = year;
      regexQuery.year = year;
    }
    if (type) {
      query.type = type;
      regexQuery.type = type;
    }
    if (course) {
      query.course = course;
      regexQuery.course = course;
    }

    const norms = await Norm.find(query);

    let regexSearch = await Norm.find({
      $or: [
        { pdf: { $regex: diacriticRegex(searchPdf), $options: 'i' } },
        {
          diacriticTitle: {
            $regex: diacriticRegex(searchTitle),
            $options: 'i',
          },
        },
      ],
    });

    norms.length > 0
      ? response.status(200).send(NormView.manyNormView(norms))
      : response.status(200).send(NormView.manyNormView(regexSearch));
  } catch (err) {
    console.log(err);
    response.status(400).json({ error: 'Erro ao encontrar' });
  }
};

export const filterNorm = async (request: Request, response: Response) => {
  try {
    const { year, type, course } = request.query;

    const filter: any = {};
    if (year) {
      filter.year = year;
    }

    if (type) {
      filter.type = type;
    }

    if (course) {
      filter.course = course;
    }

    const normsBefeoreFilter = await Norm.find(filter).sort({ date: -1 });
    return response.status(200).send(NormView.manyNormView(normsBefeoreFilter));
  } catch (error) {
    return response.status(400).send({ error: 'Erro ao filtrar' });
  }
};
