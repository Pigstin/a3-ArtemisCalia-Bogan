const express = require('express')
const cors = require('cors')
const path = require('path');

const util       = require('./modules/util.mjs');
const data       = require('./modules/data.mjs');
const middleware = require('./modules/middleware.mjs')
const routes     = require('./modules/routes.mjs')

const serverData = util.setup();

// middleware and app config
const app = express();
app.use(cors());
app.use(express.json());

// set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/public/views'))

// serve static files
app.use('/public/js',  express.static('public/js'));
app.use('/public/css', express.static('public/css'));

// route setup 
app.use(middleware.log);

app.get('/', routes.index);

// server listen
app.listen(serverData.port, () => {
    console.log(`server listening at http://localhost:${serverData.port}`);
})