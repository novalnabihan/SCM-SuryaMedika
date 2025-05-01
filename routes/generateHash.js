const bcrypt = require('bcryptjs');

// Password yang ingin di-hash
const password = 'pass123';

bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) throw err;
    console.log("Hashed Password:", hashedPassword);
    // Salin hasil hash ini dan gunakan untuk memasukkan ke database
});
