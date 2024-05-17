const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/myapp')
   .then(() => console.log('MongoDB connected'))
   .catch(err => console.error(err));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'views')));

// Define the schema for the user collection
const userSchema = new mongoose.Schema({
  email: String,
  password: String
});

// Define the model for the user collection
const User = mongoose.model('users', userSchema);

// Define route for serving the login page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'loginpage.html'));
});

// Define route for login form submission
app.post('/', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find a user document that matches the entered email and password
    const user = await User.findOne({ email, password });

    if (user) {
      // User found, login successful
      // Redirect to the index.html page
      res.redirect('/index.html');
    } else {
      // User not found or incorrect credentials
      res.send('Invalid email or password!');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
