import express from "express";

const app = express();
app.use(express.json());

app.post("/register", (req, res) => {
    res.json({ message: "User registered" });
});

app.post("/login", (req, res) => {
    res.json({ token: "fake-jwt-token" });
});

app.listen(4100, () =>
    console.log("Auth service running")
);