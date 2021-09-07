if(process.env.NODE_ENV !== "production" ) {
    require("dotenv").config()
}

const express = require("express");
const app = express();
const expressLayout = require("express-ejs-layouts");

const indexRouter = require("./routes/index");

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout","layouts/layout");

app.use(expressLayout);
app.use(express.static("public"));
app.use("/",indexRouter);

const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL   , {useNewUrlParser: true});

const db = mongoose.connection
//se encontrar um erro no banco de dados imprima a mensagem 'error'
db.on('error', error => console.error(error));
//quando abrimos o db imprima
db.once('open', () => console.log("Connected to Mongoose"));



app.listen(process.env.PORT || 3000);