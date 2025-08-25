import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express from 'express';
import { connectDB } from './config/configDB';
import initWebRoutes from './routes/web';

dotenv.config();

const app = express();

// Config view engine
app.set('view engine', 'ejs');
app.set('views', './src/views');

// Config body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Init web routes
initWebRoutes(app);

// Connect to database
connectDB();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});