const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

app.use(cors());

mongoose.connect(
    'mongodb+srv://vladdelusive:tBLoPWHnTXxkdU16@cluster0.ar4sy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true }
)
mongoose.connection.once('open', () => {
    console.log('conneted to database');
});

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
}))

app.listen(4000, () => {
    console.log('now listening for requests on port 4000');
});
