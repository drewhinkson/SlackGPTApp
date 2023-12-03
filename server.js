const express = require('express');
require('dotenv').config();
console.log('MongoDB URI:', process.env.MONGODB_URI);
console.log('Test Var:', process.env.TEST_VAR);

const slackEventReceiver = require('./slackEventReceiver');

const { connectToDb } = require('./database');

const app = express();
app.use(express.json());

connectToDb(process.env.MONGODB_URI);

app.post('/slack/events', slackEventReceiver);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
