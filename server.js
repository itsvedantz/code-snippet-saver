require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const snippetSchema = new mongoose.Schema({
    title: String,
    code: String,
    language: String
});

const Snippet = mongoose.model('Snippet', snippetSchema);

// API routes
app.post('/snippets', async (req, res) => {
    const snippet = new Snippet(req.body);
    await snippet.save();
    res.status(201).send(snippet);
});

app.get('/snippets', async (req, res) => {
    const snippets = await Snippet.find();
    res.send(snippets);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});