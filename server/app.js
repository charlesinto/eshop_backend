import express from 'express';
import cors from "cors";
import bodyParser from 'body-parser';
import http from 'http';
import authRoute from './Routes/authRoute'
require('dotenv').config();

const app = express();
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use('/api/v1/auth', authRoute);
app.get('/', (req, res) => res.send({message:'welcome to endsoup api'}))
const port = process.env.PORT || 5000;
const server = http.createServer(app)


server.listen(port,()=>{console.log(`server is listening on port ${port}`)});

export default server;