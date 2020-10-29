var express = require('express');
require('./API/userDatabase');
var PORT = process.env.PORT || 3000; 
var app = express();
const router = require('./API/routes/userRoutes');

app.use(express.json());
app.use(router);

app.listen(PORT, () => {
    console.log(`Listening on ${PORT} port`)
});