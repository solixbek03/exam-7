import { Router } from 'express'
import userController from '../controller/user.controller.js'


const router = Router()

// router.post('/login', userController.LOGIN)
router.post('/register', userController.REGISTER);
// router.get('/users', userController.GET);
router.get('/users/:token', userController.GET);


// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzMSIsImlhdCI6MTY3MjQwMDYwNn0.8nvb6_Y-hdPxgVlFS-05QoaYHYAvm_xVfoAm_B3JCNY
export default router;