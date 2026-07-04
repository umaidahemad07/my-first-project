const express = require('express');
const ejsMate = require('ejs-mate');

const app = express();

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

app.get('/', (req,res) => {
    res.render('index.ejs');
})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});