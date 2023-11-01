import express from 'express';
import pdfParse from 'pdf-parse';
import multer from 'multer';

import Norm from '../models/norm';

const router = express.Router();
const upload = multer();

router.post('/addNorm', upload.single('pdf'), async (request, response) => {
    const pdf = request.file!.buffer;
    const { title, description, type, course } = request.body;

    pdfParse(pdf)
        .then(data => {
            const norm = new Norm({
                pdf: data.text,
                title,
                description,
                type,
                course,
            });
            norm.save();
            return response.status(200).send(norm);
        })
        .catch(error => {
            response.status(400).send(error);
        });
});

router.get('/getNorm', async (request, response) => {
    try {
        const norms = await Norm.find();
        response.status(200).send(norms);
    } catch {
        response.status(500).json({ error: 'Erro ao encontrar' });
    }
});

module.exports = (app: any) => app.use('/norm', router);
