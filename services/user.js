import { getData, createData, updateData, deleteData, getDataByEmail } from "../repositories/users.js";
import { errorResponse, successResponse } from "../utils/response.js";
import bcrypt, { hash } from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET_ACCESS_TOKEN = 'kelas.com';
const SECRET_REFRESH_TOKEN = 'backend';

export const getUser = async (request, response, next) => {
    try {
        let [users] = await getData();
        console.log(request.claims);
        if(users.length > 0) {
            successResponse(response, "success", users);
        } else {
            errorResponse(response, "data not found!!", 404);
        }
    } catch(error) {
        next(error)
    }
}

export const createUser = async (request, response, next) => {
    try {
        let name = request.body.name;
        let email = request.body.email;
        let password = request.body.password;
        let saltRound = 10;
        bcrypt.hash(password, saltRound, async (error, hashedPassword) => {
            let [result] = await createData(name, email, hashedPassword);
            if (result.insertId > 0) {
                successResponse(response, "success create data", result.insertId, 201)
            } else {
                errorResponse(response, "error create data");
            }
        });
        
    } catch(error) {
        next(error)
    }
}

export const updateUser = async (request, response, next) => {
    try {
        let id = request.params.id;
        let name = request.body.name;
        let email = request.body.email;

        let [result] = await updateData(id, name, email);

        if(result.affectedRows > 0){
            successResponse(response, "success updating data", result.affectedRows)
        } else {
            errorResponse(response, "id not found",404)
        }
    } catch {
        next(error);
    }
    
}

export const deleteUser = async (request, response, next) => {
    try {
        let id = request.params.id;
        let [result] = await deleteData(id);

        if(result.affectedRows > 0){
            successResponse(response, "success delete data", result)
        } else {
            errorResponse(response, "id not found!!", 404)
        }
    } catch(error) {
        next(error);
    }
    
}

export const login = async (request, response, next) => {
    try {
        let email = request.body.email;
        let password = request.body.password;

        const [result] = await getDataByEmail(email, password);
        if (result.length > 0) {
            const user = result[0];
            bcrypt.compare(password, user.password, (error, isValid) => {
                if(isValid) {
                    let payload = {
                        id: user.user_id,
                        name: user.name, 
                        email: user.email,
                    }
                    let accessToken = jwt.sign(payload, SECRET_ACCESS_TOKEN, {expiresIn:'15m'});
                    let refreshToken = jwt.sign(payload, SECRET_REFRESH_TOKEN, {expiresIn:"30m"});

                    let data = {
                        access_token: accessToken, 
                        refresh_token: refreshToken,
                    }

                    successResponse(response, "success", data);
                } else {
                    errorResponse(response, "invalid email or password",401)
                }
            })
        }
    } catch (error) {
        next(error);
    }
}

export const validateToken = (request, response, next) => {
    const authHeader = request.headers.authorization;
    const accessToken = authHeader && authHeader.split(' ')[1];

    if (accessToken) {
        jwt.verify(accessToken, SECRET_ACCESS_TOKEN, (error, claims) => {
            if(error) {
                errorResponse(response, error.message, 403)
            } else {
                request.claims = claims
                next();
            }
        })
    } else {
        errorResponse(response, "invalid request, authoriztion not found!!!");
    }
}
