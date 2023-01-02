import { Router } from 'express';
import messageController from '../controller/post.controller.js';
// import checkToken from '../middlewares/checkToken.js';

const router = Router();


router.get('/post', messageController.GET);

export default router;