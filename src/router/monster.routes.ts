import { Router } from 'express';
import { MonsterController } from '../controllers/monster.controller';

const router = Router();

router.get('/', MonsterController.list);
router.post('/', MonsterController.create);
router.get('/:id', MonsterController.get);
router.put('/:id', MonsterController.update);
router.delete('/:id', MonsterController.remove);

export default router;
