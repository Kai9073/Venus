const express = require('express');
const app = express();

app.use(express.static('view engine', 'ejs'));

app.get('/', (req, res) => {
    res.render('index', { bot: { name: 'Venus' }});
});

const listener = app.listen(3000, () => {
    console.log(`App is listening to port ${listener.address().port}.`);
});