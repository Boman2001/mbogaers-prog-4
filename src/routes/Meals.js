const express = require('express');
const meals = require('../services/Meals');
const participants = require('../services/participants');

const router = new express.Router();


/**
 * Get a Meal.
 */
router.get('/:id', async (req, res, next) => {
  let options
  if (req.header('Authorization')){
    options = {
      id: req.params['id'],
      token: req.header('Authorization').split(" ")[1],
    };
  }else{
    options = {
      id: req.params['id'],
      token: "non auth",
    };
  }

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
router.get('/:mealId/participants', async (req, res, next) => {
  let options
  if (req.header('Authorization')){
    options = {
      token: req.header('Authorization').split(" ")[1],
      mealId: req.params['mealId'],
    };
  }else{
    options = {
      mealId: req.params['mealId'],
      token: "non auth",
    };
  }

  try {
    const result = await participants.getAllParticipants(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

/**
 * Get a User.
 */
router.get('/:mealId/participants/:participantId', async (req, res, next) => {
  let options
  if (req.header('Authorization')){
    options = {
      token: req.header('Authorization').split(" ")[1],
      participantId: req.params['participantId'],
      mealId: req.params['mealId'],
    };
  }else{
    options = {
      mealId: req.params['mealId'],
      participantId: req.params['participantId'],
      token: "non auth",
    };
  }

  try {
    const result = await meals.getUserDetailFromMeal(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});


module.exports = router;

