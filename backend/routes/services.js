const express = require('express');
const router = express.Router();
const org = process.env.ORG;
const { services } = require('../models/models');

// GET all services for org
router.get('/', (req, res, next) => {
  services.find({ org: org }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      return res.json(data);
    }
  });
});

// GET single service by ID
router.get('/:id', (req, res, next) => {
  services
    .findOne({ _id: req.params.id, orgs: org }, (error, data) => {
      if (error) {
        return next(error);
      } else if (!data) {
        res.status(404).send('Service not found');
      } else {
        res.json(data);
      }
    });
});

// POST new service
router.post('/', (req, res, next) => {
  const newService = req.body;
  newService.org = org;
  services.create(newService, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// PUT update service
router.put('/:id', (req, res, next) => {
  services.findOneAndUpdate(
    { _id: req.params.id, orgs: org },
    req.body,
    { new: true },
    (error, data) => {
      if (error) {
        return next(error);
      } else if (!data) {
        res.status(404).send('Service not found');
      } else {
        res.json(data);
      }
    }
  );
});

module.exports = router;