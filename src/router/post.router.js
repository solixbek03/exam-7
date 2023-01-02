import { Router } from 'express';
import messageController from '../controller/post.controller.js';
import checkToken from '../middlewares/checkToken.js';

const router = Router();


router.get('/post', messageController.GET);
router.post('/post', messageController.POST);
router.delete('/post/:id', messageController.DELETE);
router.put('/post/:id', checkToken, messageController.PUT);




export default router;