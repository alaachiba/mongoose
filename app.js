const peopleRoutes = require('./routes/people');
const express = require('express');
const app = express();
app.use('/people', peopleRoutes);
