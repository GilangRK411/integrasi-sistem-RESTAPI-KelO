import express from 'express';
import {addFood} from '../controllers/food/food.add.controllers.js';
import {showFood} from '../controllers/food/food.show.controllers.js';
import {updateFood} from '../controllers/food/food.edit.controllers.js';

const router = express.Router();

router.post('/add', addFood);
router.get('/show', showFood);
router.put('/update/:id', updateFood);

export default router;