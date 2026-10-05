const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  allowedHeaders: ['Content-Type', 'Authorization'],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
}));
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/gifts', require('./routes/gifts'));
app.use('/api/wishlists', require('./routes/wishlists'));
app.use('/api/history',   require('./routes/history'));
app.use('/api/chat', require('./routes/chat'));
app.use('/api/profiles', require('./routes/profiles'));
app.use('/api/feed', require('./routes/feed'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/rappels', require('./routes/rappels'));
app.use('/api/notifications', require('./routes/notifications'));
require('./jobs/notifScheduler');
// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log(' MongoDB connecté'))
  .catch(err => console.error(' Erreur MongoDB:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Serveur lancé sur http://localhost:${PORT}`));