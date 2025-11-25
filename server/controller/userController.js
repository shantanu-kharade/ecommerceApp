import { updateUserService, getUserProfileService} from '../service/userService.js';
import { authenticateToken, authorizeRole } from '../middleware/middleware.js';
import { validateUserBody } from '../model/userModel.js';




const getUserProfile = async (req, res) => {

    try {
        console.log(req.headers);
        const authenicateUser = await authenticateToken(req, res);
        if (!authenicateUser) {
            return res.send("User not authenticated");
        }
        const user = await getUserProfileService(req, res);
        res.send(user);
    }
    catch (error) {
        res.send(error.message);
    }

}

const updateUser = async (req, res) => {
    try{
        const authenicateUser = await authenticateToken(req, res);
        if (!authenicateUser) {
            return res.send("User not authenticated");
        }
        const updatedUser = await updateUserService(req, res);
        res.send(updatedUser);
    }
    catch (error) {
        res.send(error.message);
    }
}

export {
    getUserProfile,
    updateUser
}