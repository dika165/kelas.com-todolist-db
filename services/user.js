import { getData, createData, updateData, deleteData } from "../repositories/users.js";

export const getUser = async () => {
    let [users] = await getData();

    if(users.length > 0) {
        console.log(users);
    } else {
        console.log("data users kosong");
    }
}

export const createUser = async (name, email, password) => {
    let [result] = await createData(name, email, password);

    if (result.insertId > 0) {
        console.log("Data user berhasil ditambahkan dengan id: ", result.insertId);
    } else {
        console.log("gagal menambahkan data user")
    }
}

export const updateUser = async (id, name, email) => {
    let [result] = await updateData(id, name, email);

    if(result.affectedRows > 0){
        console.log("update user berhasil")
    } else {
        console.log("id user tidak ditemukan")
    }
}

export const deleteUser = async (id) => {
    let [result] = await deleteData(id);

    if(result.affectedRows > 0){
        console.log("menghapus data berhasil");
    } else {
        console.log("gagal menghapus data / id tidak ditemukan")
    }
}