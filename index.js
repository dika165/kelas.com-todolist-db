/*
    1. Buat table dengan nama tasks dan buat field / column sebagai berikut: 
        - task_id => int auto increment
        - user_id => int
        - title => varchar
        - is_done => tinyint => (0/1)
        - created_at => datetime
        - updated_at => datetime
    
    2. buat process CRUD untuk table tersebut
    3. Pada function create task setelah berhasil menambahkan tampilkan data yang ditambahkan
    4. pada function update setelah berhasil memperbarui data tampilkan data yang di perbarui
*/

import * as userService from './services/user.js';
import express from 'express';

const host = "localhost";
const port = 8090;

const app = express();
app.use(express.json());
app.get("/users", userService.getUser);
app.post("/users", userService.createUser);
app.put("/users/:id",userService.updateUser);
app.delete("/users/:id", userService.deleteUser);

app.listen(port,host, ()=> {
    console.log(`Server berjalan di http://${host}:${port}`);
})