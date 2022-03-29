import { json } from "body-parser";
import userService from "../services/userService";
let handleLogin =async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if(!email || !password){
        return res.status(500).json({
            errCode: 1, // err 1 báo lỗi 0 báo thành công
            message: 'Missing inputs parameter !!!'
        })
    }
    let userData = await userService.handleUserLogin(email, password);
    //check email tồn tại hay ko check email exist
    //so sánh password mà người dùng truyền lên cho chúng ta compare password
    //return userInfor
    //access token: JWT json web token
    return res.status(200).json({
        errCode: userData.errCode, // err 1 báo lỗi 0 báo thành công
        message: userData.errMessage,
        user: userData.user ? userData.user: {} //check điều kiện mà nếu trả thông tin người dùng mà nếu ko trả thông tin người dùng thì nó {trả ra rỗng}
    })
}

let handleGetAllUsers = async (req, res) => {
    let id = req.query.id;
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'missing required',
            users: []
        })
    }
    let users = await userService.getAllUsers(id)
    
    return res.status(200).json({
        errCode: 0,
        errMessage: 'ok',
        users
    })
}

let handleCreateNewUser = async (req, res) => {
    let message = await userService.createNewUser(req.body)
    return res.status(200).json(message);
}

let handleEditUser = async (req, res) => {
    let data = req.body;
    let message = await userService.updateUserData(data);
    return res.status(200).json(message)
}
let handleDeleteUser = async(req, res) => {
    if(!req.body.id){
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required"
        })
    }
    let message = await userService.deleteUser(req.body.id)
    return res.status(200).json(message);
}
let getAllCode = async(req,res) => {
    try {
        let data = await userService.getAllCodeService(req.query.type);
        return res.status(200).json(data);
    } catch (e) {
        console.log('Get all code error: ',e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}
module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers,
    handleCreateNewUser: handleCreateNewUser,
    handleEditUser: handleEditUser,
    handleDeleteUser: handleDeleteUser,
    getAllCode:getAllCode
}