import express from 'express';
import axios from 'axios';
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


// Route to fetch a random quote
app.get('/', async (req, res) => {
  try {
    const quoteResponse = await axios.get('https://api.quotable.io/random');
    const quote = quoteResponse.data.content;
    const author = quoteResponse.data.author;
    res.render('index', { quote, author });
  } catch (error) {
    res.render('index', { error: "Failed to fetch a quote. Please try again later." });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
