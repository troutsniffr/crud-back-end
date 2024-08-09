const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bcrypt = require('bcrypt');
const session = require('express-session');
const port = process.env.PORT || 5080
const app = express();
const dotenv = require('dotenv').config();

const knex = require("knex")(
    require("./knexfile.js")[process.env.NODE_ENV || "development"]
)

app.use(express.json());
app.use(morgan("dev"));
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
  }));

app.use(session({
    secret: 'your_session_secret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
  }));
  
  const authenticateUser = (req, res, next) => {
    if (req.session.userId) {
      next();
    } else {
      res.status(401).json({ error: 'Unauthorized' });
    }
  };

// Public routes
app.get("/", (req, res) => {
    res.status(200).send("working!");
  });
  
  app.get("/surfboards", (req, res) => {
    knex('surfboards')
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        console.log(err);
        res.status(301).send("Error getting surfboards");
      });
  });
  
// Authentication routes
  app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await knex('users').where({ username }).first();
  
    if (user) {
      bcrypt.compare(password, user.password)
        .then((result) => {
          if (result) {
            req.session.userId = user.id;
            res.json({ message: 'Logged in successfully', userId: user.id });
          } else {
            res.status(401).json({ error: 'Invalid credentials' });
          }
        });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  });
  
  app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        res.status(500).json({ error: 'Could not log out' });
      } else {
        res.json({ message: 'Logged out successfully' });
      }
    });
  });
  
  // Protected routes
  app.get("/users", authenticateUser, (req, res) => {
    knex('users')
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        console.log(err);
        res.status(301).send("Error getting users");
      });
  });
  
  app.post('/surfboards', authenticateUser, async (req, res) => {
    const newSurfboard = req.body;
    knex('surfboards')
      .insert(newSurfboard)
      .returning('id')
      .then((id) => {
        res.status(201).json({ id: id[0], ...newSurfboard });
      })
      .catch((err) => {
        console.error(err);
        res.status(400).send("Error posting surfboard");
      });
  });
  
app.post('/users', authenticateUser, async (req, res) => {
    const newUser = req.body;
    bcrypt.hash(newUser.password, 10, (err, hashedPassword) => {
        if (err) {
            console.error(err);
            return res.status(400).send("Error posting user");
        }
        newUser.password = hashedPassword;
        knex('users')
            .insert(newUser)
            .returning('id')
            .then((id) => {
                res.status(201).json({ id: id[0], ...newUser });
            })
            .catch((err) => {
                console.error(err);
                res.status(400).send("Error posting user");
            });
    });
});

  
  app.put('/surfboards/:id', authenticateUser, (req, res) => {
    const updatedSurfboard = req.body;
    knex('surfboards')
      .where({ id: req.params.id })
      .update(updatedSurfboard)
      .then((updatedCount) => {
        if (updatedCount) {
          res.json({ message: 'Surfboard updated successfully' });
        } else {
          res.status(404).json({ error: 'Surfboard not found' });
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(400).send("Error updating surfboard");
      });
  });
  
  app.put('/users/:id', authenticateUser, (req, res) => {
    const updatedUser = req.body;
    knex('users')
      .where({ id: req.params.id })
      .update(updatedUser)
      .then((updatedCount) => {
        if (updatedCount) {
          res.json({ message: 'User updated successfully' });
        } else {
          res.status(404).json({ error: 'User not found' });
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(400).send("Error updating users");
      });
  });
  
  app.delete('/surfboards/:id', authenticateUser, (req, res) => {
    knex('surfboards')
      .where({ id: req.params.id })
      .del()
      .then((deletedCount) => {
        if (deletedCount > 0) {
          res.json({ message: 'Surfboard deleted successfully' });
        } else {
          res.status(404).json({ error: 'Surfboard not found' });
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(400).send("Error deleting surfboard");
      });
  });
  
  app.delete('/users/:id', authenticateUser, (req, res) => {
    knex('users')
      .where({ id: req.params.id })
      .del()
      .then((deletedCount) => {
        if (deletedCount > 0) {
          res.json({ message: 'User deleted successfully' });
        } else {
          res.status(404).json({ error: 'Users not found' });
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(400).send("Error deleting user");
      });
  });
  
  app.listen(port, () => {
    console.log("App listening on port:", port);
  });