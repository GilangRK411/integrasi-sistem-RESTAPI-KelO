import express from 'express';
import {addFood} from '../controllers/food/food.add.controllers.js';
import {showFood} from '../controllers/food/food.show.controllers.js';
import {updateFood} from '../controllers/food/food.edit.controllers.js';
import {removeFood} from '../controllers/food/food.remove.controllers.js';
import {addRating} from '../controllers/food/food.rating.controllers.js';
import {getFoodRatings} from '../controllers/food/food.rating.controllers.js';
import {buyFood} from '../controllers/food/food.order.controllers.js';
import {authenticate} from '../middleware/user.authenticate.js';

const router = express.Router();

router.post('/add', authenticate, addFood);
router.get('/show', showFood);
router.put('/update/:id', authenticate, updateFood);
router.delete('/remove/:id', authenticate, removeFood);
router.post('/ratings', authenticate, addRating);
router.get('/ratings/:foodId', authenticate, getFoodRatings);
router.post('/order', buyFood);

export default router;