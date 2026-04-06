import { Router } from "express";
import { publishEvent } from "@lifetech/event-bus";

const router = Router();

router.post("/login", async (req, res) => {

    const { email } = req.body;

    // login fake por ahora
    const user = {
        id: 1,
        email
    };

    // 🔥 EVENTO DEL SISTEMA
    await publishEvent("user.logged_in", {
        userId: user.id,
        email: user.email,
        time: Date.now()
    });

    res.json({
        message: "Login success",
        user
    });
});

export default router;