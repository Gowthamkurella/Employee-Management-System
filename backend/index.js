const conn = require("./connection");
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require('bcryptjs');
const cors = require('cors');
const tlogin = require('./models/t_login')
const MongoStore = require('connect-mongo');


dotenv.config();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const defaultSessionSecret = "mydefaultsecretkey";
const PORT = process.env.PORT || 5000;
app.use(cors());

app.use(session({
  secret: 'your secret key',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: 'mongodb+srv://admin:QjwWaXvnnuIZ46MY@cluster0.dteekjh.mongodb.net/' }),
  cookie: { secure: 'auto', maxAge: 24 * 60 * 60 * 1000 } // 24 hours
}));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


app.get('/session', (req, res) => {
    if (req.session.user) {
      res.json({ isLoggedIn: true, user: req.session.user });
    } else {
      res.status(401).json({ isLoggedIn: false });
    }
  });


app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    
    if (!username || !password) {
      // Both fields are required
      return res.status(400).json({ message: 'Username and password are required.' });
    }
    try {
      const user = await tlogin.findOne({ f_userName : username });
      
      if (!user) {
        // User not found
        return res.status(401).json({ message: 'Invalid login details.' });
      }
      if (!(user.f_Pwd === password) ) {
        // Passwords do not match
        return res.status(401).json({ message: 'Invalid login details.' });
      }
  
      req.session.user = user;
      console.log(req.session.user);
      res.json({ message: 'Login successful.', user: user.f_userName });

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred during login.' });
    }
});
  