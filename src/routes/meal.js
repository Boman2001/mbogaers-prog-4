const express = require('express');
const meal = require('../services/meal');

const router = new express.Router();


/**
 * get All Participants
 */
router.post('/:mealId/participants', async (req, res, next) => {
  const options = {
    mealId: req.params['mealId']
  };

  try {
    const result = await meal.getAllParticipants(options);
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
    const result = await meal.getUserDetailFromMeal(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
