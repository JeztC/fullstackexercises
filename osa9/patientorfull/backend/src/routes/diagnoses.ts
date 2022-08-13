import express from "express";
import diagnoseService from "../services/diagnoseService";

const router = express.Router()

router.get("/", (_req, res) =>
    res.send(diagnoseService.getNonSensitiveDiagnoses())
);

router.get('/:id', (req, res) => {
    const diagnose = diagnoseService.findById(req.params.id);
    if (diagnose) {
        res.send(diagnose);
    } else {
        res.sendStatus(404);
    }
});

export default router