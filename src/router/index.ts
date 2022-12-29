import { Router } from 'express';

import monsterRouter from './monster.routes';

const router = Router();

router.use('/monsters', monsterRouter);

export default router;
