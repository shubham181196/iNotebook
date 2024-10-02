require('dotenv').config(); 

const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5003; 

const connectToMongo = require('./db');
connectToMongo();

app.get('/', (req, res) => {
    res.send("Hello world");
});

app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(port, () => {
    console.log("App running at port", port);
});
