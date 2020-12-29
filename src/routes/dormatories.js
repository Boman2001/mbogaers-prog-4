const express = require('express');
const dormatories = require('../services/dormatories');

const router = new express.Router();

/**
 * create Dorm.
 */
router.post('/', async (req, res, next) => {
  const options = {
    token: req.header('Authorization').split(" ")[1],
    body: req.body
  };

  try {
    const result = await dormatories.createDorm(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

/**
 * Get all Dorms.
 */
router.get('/', async (req, res, next) => {
  const options = {
    name: req.query['name'],
    city: req.query['city']
  };

  try {
    const result = await dormatories.getAllDorm(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

/**
 * Get a Dorm.
 */
router.get('/:id', async (req, res, next) => {
  const options = {
    id: req.params['id']
  };

  try {
    const result = await dormatories.getDormDetail(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

/**
 * Deletes an existing Dorm.
 */
router.delete('/:id', async (req, res, next) => {
  const options = {
    id: req.params['id'],
    token: req.header('Authorization').split(" ")[1]
  };

  try {
    const result = await dormatories.deleteDorm(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

/**
 * Edit a Dorm.
 */
router.put('/:id', async (req, res, next) => {
  const options = {
    id: req.params['id'],
    body: req.body,
    token: req.header('Authorization').split(" ")[1]
  };

  try {
    const result = await dormatories.editDorm(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

/**
 * Register to a Dorm.
 */
router.post('/:id/user', async (req, res, next) => {
  const options = {
    id: req.params['id'],
    body: req.body,
    token: req.header('Authorization').split(" ")[1]
  };

  try {
    const result = await dormatories.registerToDorm(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

/**
 * create a Meal for a Dorm
 */
router.post('/:dormId/meal', async (req, res, next) => {
  const options = {
    dormId: req.params['dormId'],
    body: req.body,
    token: req.header('Authorization').split(" ")[1]
  };

  try {
    const result = await dormatories.createMeal(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

/**
 * Get a Meal.
 */
router.get('/:dormId/meal', async (req, res, next) => {
  const options = {
    dormId: req.params['dormId'],
    token: req.header('Authorization').split(" ")[1]
  };

  try {
    const result = await dormatories.getMealOverview(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

/**
 * Get a Meal.
 */
router.get('/:dormId/meal/:mealId', async (req, res, next) => {
  const options = {
    dormId: req.params['dormId'],
    mealId: req.params['mealId']
  };

  try {
    const result = await dormatories.getMealDetail(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

/**
 * Edit a Meal.
 */
router.put('/:dormId/meal/:mealId', async (req, res, next) => {
  const options = {
    dormId: req.params['dormId'],
    mealId: req.params['mealId'],
    body: req.body,
    token: req.header('Authorization').split(" ")[1]
  };

  try {
    const result = await dormatories.editMeal(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

/**
 * delete a Meal.
 */
router.delete('/:dormId/meal/:mealId', async (req, res, next) => {
  const options = {
    dormId: req.params['dormId'],
    mealId: req.params['mealId'],
    token: req.header('Authorization').split(" ")[1]
  };

  try {
    const result = await dormatories.deleteMeal(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

/**
 * register A Participant
 */
router.post('/:dormId/meal/:mealId/signup', async (req, res, next) => {
  const options = {
    dormId: req.params['dormId'],
    mealid: req.params['mealid'],
    token: req.header('Authorization').split(" ")[1]
  };

  try {
    const result = await dormatories.registerParticipant(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

/**
 * deregister A Participant
 */
router.put('/:dormId/meal/:mealId/signoff', async (req, res, next) => {
  const options = {
    dormId: req.params['dormId'],
    mealid: req.params['mealid'],
    token: req.header('Authorization').split(" ")[1]
  };

  try {
    const result = await dormatories.deregisterParticipant(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
