import express, { Request, Response } from "express";
import { getPlacesControl } from '../controllers/studyController';

const router = express.Router();

router.get('/search', async (req: Request, res: Response ) => {
    await getPlacesControl(req, res);
});

export default router;