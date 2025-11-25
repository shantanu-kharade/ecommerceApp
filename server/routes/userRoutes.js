import Router from 'express';
import { getUserProfile, updateUser } from '../controller/userController.js'

const userRouter = Router();


//get user profile
userRouter.get('/profile' , getUserProfile)

//update user profile
userRouter.put('/update-profile' , updateUser)


export default userRouter;