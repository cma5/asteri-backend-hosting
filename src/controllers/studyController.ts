import { getPlaces } from '../services/studyServices';
import { Request, Response } from 'express';

export const getPlacesControl = async (req: Request, res: Response) => {
    try {
        const searchParams = req.query;
        const places = await getPlaces(searchParams);
        res.json(places);
    }
    catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}