import { Request, Response } from 'express';
import pdfParse from 'pdf-parse';
import Norm from '../models/norm';
import { diacriticRegex } from '../../utils/diacritic-regex';
import moment from 'moment';

export const postNorm = async (request: Request, response: Response) => {
  const pdf = request.file!.buffer;
  const { title, description, type, course, date } = request.body;

  pdfParse(pdf)
    .then(data => {
      const norm = new Norm({
        title,
        pdf: data.text,
        description,
        course,
        type,
        date,
      });
      const isoDate = moment(date, 'YYYY-MM-DD').toISOString();
      norm.year = moment(isoDate).format('YYYY');

      norm.save();
      return response.status(200).send(norm);
    })
    .catch(error => {
      response.status(400).send(error);
    });
};

export const getNorms = async (request: Request, response: Response) => {
  try {
    const norms = await Norm.find();
    response.status(200).send(norms);
  } catch (error) {
    response.status(500).json({ error: 'Erro ao encontrar' });
  }
};

export const searchNorm = async (request: Request, response: Response) => {
  const searchPdf = request.params.term;
  const searchTitle = request.params.term;
  const { year, type, course } = request.query;

  try {
    const query: any = {
      $text: {
        $search: `${searchPdf} ${searchTitle}`,
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
      pdf: { $regex: diacriticRegex(searchPdf), $options: 'i' },
    });

    if (regexSearch.length === 0) {
      regexSearch = await Norm.find({
        title: { $regex: diacriticRegex(searchTitle), $options: 'i' },
      });
    }

    norms.length > 0
      ? response.status(200).send(norms)
      : response.status(200).send(regexSearch);
  } catch (error) {
    console.log(error);
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

    const normsBefeoreFilter = await Norm.find(filter);
    return response.status(200).send(normsBefeoreFilter);
  } catch (error) {
    return response.status(400).send({ error: 'Erro ao filtrar' });
  }
};
