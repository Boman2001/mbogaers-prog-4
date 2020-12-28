const express = require('express');
const meals = require('../services/Meals');

const router = new express.Router();


/**
 * Get a Meal.
 */
router.get('/:id', async (req, res, next) => {
  const options = {
    id: req.params['id']
  };

  try {
    const result = await meals.getMealDetail(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

/**
 * get All Participants
 */
router.post('/:mealId/participants', async (req, res, next) => {
  const options = {
    mealId: req.params['mealId']
  };

  try {
    const result = await meals.getAllParticipants(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

/**
 * Get a User.
 */
router.get('/:mealId/participants/:participantId', async (req, res, next) => {
  const options = {
    mealId: req.params['mealId'],
    participantId: req.params['participantId']
  };

  try {
    const result = await meals.getUserDetailFromMeal(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
