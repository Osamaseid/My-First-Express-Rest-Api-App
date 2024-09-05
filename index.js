const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const app = express();

app.use(express.json());

// Create user
app.post('/users', async (req, res) => {
  const { email, password, name } = req.body;
  const user = await prisma.user.create({
    data: { email, password, name }
  });
  res.json(user);
});

// Get all users
app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

// Get user by ID
app.get('/users/:id', async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({ where: { id: Number(id) } });
  res.json(user);
});

// Update user
app.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { email, name } = req.body;
  const user = await prisma.user.update({
    where: { id: Number(id) },
    data: { email, name }
  });
  res.json(user);
});

// Delete user
app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  await prisma.user.delete({ where: { id: Number(id) } });
  res.sendStatus(204);
});

app.listen(3000, () => console.log("Server running on port 3000"));
