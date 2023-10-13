import dbPool from "../utils/db.js";

const getData = () => {
    const query = "SELECT user_id, name, email, password, created_at FROM users";

    return dbPool.query(query);
}

const createData = (name, email, password) => {
    let createdAt = new Date();
    const query = "INSERT INTO users (name, email, password, created_at) VALUES (?,?,?,?)";
    const value = [name, email, password, createdAt];

    return dbPool.query(query, value);
}

const updateData = (id, nama, email) => {
    let updatedAt = new Date();

    const query = "UPDATE users SET name = ? , email= ? , updated_at = ? WHERE user_id = ?";
    const value = [nama, email, updatedAt, id];
    let result = dbPool.query(query, value);

    return result;
}

const deleteData = (id) => {
    const query = "DELETE FROM users WHERE user_id = ?";

    return dbPool.query(query, [id]);
}

const getDataByEmail = (email) => {
    const query = "SELECT user_id, name, email, password FROM users WHERE email = ?";

    return dbPool.query(query, [email]);
}

export { getData, createData, updateData, deleteData, getDataByEmail };