import path from 'path';
import nodemailer from 'nodemailer';
const { host, port, user, pass } = require('../config/mail.json');
import hbs from 'nodemailer-express-handlebars';

const transport = nodemailer.createTransport({
    host,
    port,
    auth: { user, pass },
});

transport.use(
    'compile',
    hbs({
        viewEngine: {
            defaultLayout: undefined,
            partialsDir: path.resolve('./src/resources/mail/'),
        },
        viewPath: path.resolve('./src/resources/mail/'),
        extName: '.html',
    }),
);

export default transport;
