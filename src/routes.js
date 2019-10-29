// Controllers
import SessionController from './app/controllers/SessionController';

import auth from './app/middlewares/auth';

const express = require('express');

const routes = new express.Router();

/**
 * Public Routes
 */

// Sessions
routes.post('/sessions', SessionController.store);

/**
 * Private Routes
 */

routes.use(auth);

// Studants
routes.get('/students', (req, res) => {
  res.json({ ok: true });
});

module.exports = routes;
