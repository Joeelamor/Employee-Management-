const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes');
const cors = require('cors');


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(cors());
app.use((req, res, next) => {
    console.log('A ' + req.method + ' request received at ' + new Date() + '\n' + "Request body is " + JSON.stringify(req.body));
    next();
});

routes(app);
app.listen(8080);


