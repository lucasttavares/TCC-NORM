import express from 'express';
import cors from 'cors';
import 'dotenv/config';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

require('./app/routes/auths.routes')(app);
require('./app/routes/norms.routes')(app);
require('./app/routes/profile.routes')(app);

app.use('/upload_file', express.static('upload_file'));

app.listen(process.env.PORT, () => {
  console.log(`Server rodando na porta ${process.env.PORT}`);
});
