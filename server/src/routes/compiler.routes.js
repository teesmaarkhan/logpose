import { Router } from 'express';
import { fetchTestCases } from '../controllers/scraper.controller.js';
import { runCode } from '../controllers/compiler.controller.js';

const router = Router();
router.post('/fetch-tc', fetchTestCases);
router.post('/run-code', runCode);

export default router;