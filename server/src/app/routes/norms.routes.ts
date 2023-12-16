import express from 'express';
import multer from 'multer';
import {
  postNorm,
  getNorms,
  searchNorm,
  filterNorm,
} from '../controllers/normController';
import authMiddleware from '../middlewares/auth';

const router = express.Router();
const upload = multer();

router.post('/addNorm', authMiddleware, upload.single('pdf'), postNorm);
router.get('/getNorms', getNorms);
router.get('/searchNorm/:term', searchNorm);
router.get('/filter', filterNorm);

module.exports = (app: any) => app.use('/norm', router);
