const express = require('express');

// Tells node that this is an Express server
const app = express();

// setting port for server
const PORT = process.env.PORT || 3000;

// sets up Express to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// allows us access to the css, html, and front-end js
app.use(express.static('public'));

// server route map
require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);

// sets up the listening port
app.listen(PORT, () => {
    console.log(`App is listening on PORT: ${PORT}`);
});