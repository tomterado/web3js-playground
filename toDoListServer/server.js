const express = require('express');
const app = express();
const PORT = 3000;

//Static Middleware
app.use(express.static('app'));

app.use(express.static('build/contracts'));

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/app/index.html`);
})
app.get('*', (req, res) => {
    res.status(404);
    res.send("Oops URL not exist");
})

app.listen(PORT, () => {
    console.log(`ETH App is listening on ${PORT}`);
});
