const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();

app.use(bodyParser.json());
app.use('/', routes);

const PORT = process.env.PORT || 3000;
if (!module.parent) {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
