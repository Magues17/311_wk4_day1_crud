const express = require('express')
const app = express()
const port = process.env.PORT || 4000

const { users } = require('./state')

app.use(express.json());

/* BEGIN - create routes here */

// GET /users
app.get('/users', (req, res) => {
    res.send(users)
  })
  
// GET /users/:userId
app.get('/users/:id', (req, res) => {
  const userId = req.params.userId;
  const user = users.find(user => user.id === userId);
  if (!user) {
    res.status(404).send('User not found');
  } else {
    res.send(user);
  }
});
  
  // POST /users
  app.post('/users', (req, res) => {
    const user = req.body
    users.push(user)
    res.send(user)
  })
  
// PUT /users/1
app.put('/users/1', (req, res) => {
  const user = users[0];
  const { name, occupation } = req.body;

  if (name) {
    user.name = name;
  }

  if (occupation) {
    user.occupation = occupation;
  }

  res.json(user);
});

  // PUT /users/1
app.put('/users/1', (req, res) => {
  const user = users[0]
  const newName = req.body.name || user.name
  const newOccupation = req.body.occupation || user.occupation

  user.name = newName
  user.occupation = newOccupation

  res.json(user)
})
  
// DELETE /users/1
app.delete('/users/1', (req, res) => {
  users.shift(); // Remove the first item from the users array
  res.send('deleted');
});

// POST /users
app.post('/users', (req, res) => {
  const { name, occupation } = req.body;
  const newUser = {
    _id: counter + 1,
    name,
    occupation
  };

  users.push(newUser);
  counter++;

  res.json(newUser);
});

/* END - create routes here */

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});