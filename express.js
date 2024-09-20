const express = require('express');
const port = 3000;
const app = express();
const morgan = require('morgan');

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const hospitalRoutes = require('./routes/basicroutes');
app.use('/hospitals', hospitalRoutes);

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
