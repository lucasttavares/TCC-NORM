import express from 'express';
import multer from 'multer';
import {
  postNorm,
  getNorms,
  updateNorm,
  deleteNorm,
  searchNorm,
  filterNorm,
} from '../controllers/normController';
import authMiddleware from '../middlewares/auth';
import upload from '../../utils/upload';

const router = express.Router();

router.post('/addNorm', authMiddleware, upload.single('pdf'), postNorm);
router.get('/getNorms', getNorms);
router.put('/updateNorm', authMiddleware, updateNorm);
router.delete('/deleteNorm/:id', authMiddleware, deleteNorm);
router.get('/searchNorm/:term', searchNorm);
router.get('/filter', filterNorm);

module.exports = (app: any) => app.use('/norm', router);
