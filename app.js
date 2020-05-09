const express = require('express');

const app = express();

require('dotenv').config();

let port = 4000;

app.listen(port, () => {
    console.log(`The server is actually running on port ${port}`);
})
