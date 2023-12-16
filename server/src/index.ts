import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./app/routes/auths.routes')(app);
require('./app/routes/norms.routes')(app);
require('./app/routes/profile.routes')(app);

app.listen(3001);
