import express from 'express';
import {addFood} from '../controllers/food/food.add.controllers.js';
import {showFood} from '../controllers/food/food.show.controllers.js';
import {updateFood} from '../controllers/food/food.edit.controllers.js';
import {removeFood} from '../controllers/food/food.remove.controllers.js';
import {authenticate} from '../middleware/user.authenticate.js';

const router = express.Router();

router.post('/add', authenticate, addFood);
router.get('/show', showFood);
router.put('/update/:id', authenticate, updateFood);
router.delete('/remove/:id', removeFood);

export default router;