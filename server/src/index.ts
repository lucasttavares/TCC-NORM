import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./app/controllers/authController')(app);
require('./app/controllers/projectController')(app);
require('./app/controllers/normController')(app);

app.listen(3001);
