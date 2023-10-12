import { getData, createData, updateData, deleteData } from "../repositories/users.js";
import { errorResponse, successResponse } from "../utils/response.js";

export const getUser = async (request, response, next) => {
    try {
        let [users] = await getData();
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

        let [result] = await createData(name, email, password);

        if (result.insertId > 0) {
            successResponse(response, "success create data", result.insertId, 201)
        } else {
            errorResponse(response, "error create data");
        }
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