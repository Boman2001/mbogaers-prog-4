const router = new express.Router();
const info = require("../services/Info")

/**
 * Get all info
 */
router.get('/', async (req, res, next) => {
  try {
    const result = await info.getInfo();
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});
