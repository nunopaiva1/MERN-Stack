const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

//Para criar servidor Express
const app = express();
const port = process.env.PORT || 5000;

//Middleware
app.use(cors());
//Permite fazer parse de JSON
app.use(express.json());

const uri = process.env.ATLAS_URI;
//As flags usadas "useNewUrlPaser" e outras são para lidar novos updates do mongo
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology:true});
const connection = mongoose.connection;
//Uma vez estabelecida a conexão emite esse log
connection.once('open', () => {
    console.log("MongoDB conectado com sucesso!");
})

const forumRouter = require('./routes/forum');
const usersRouter = require('./routes/users');
const playerRouter = require('./routes/players');
const teamRouter = require('./routes/teams');
const matchRouter = require('./routes/matches');


app.use('/forum', forumRouter);
app.use('/users', usersRouter);
app.use('/players', playerRouter);
app.use('/teams', teamRouter);
app.use('/matches', matchRouter);


//Começa o servidor na porta definida
app.listen(port, () => {
    console.log("Servidor ativo na porta:" + port);
});