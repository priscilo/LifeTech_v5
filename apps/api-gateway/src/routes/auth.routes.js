import { Router } from "express";

const router = Router();

router.get("/", (_, res) => {
    res.json({ message: "Auth service alive" });
});

export default router;