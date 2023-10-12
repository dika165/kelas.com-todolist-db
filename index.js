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

await userService.getUser();

await userService.createUser("ahmad", "ahmad@gmail.com", "pass1234");

await userService.updateUser(3, "Ulfah", "ulfa@gmail.com");

await userService.deleteUser(1);

await userService.getUser();