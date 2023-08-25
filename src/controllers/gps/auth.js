import jwt from "jsonwebtoken";

const secretKey = process.env.SECRET_TOKEN;

export const authController = async (req, res) => {
  try {
    console.log("------/api/login------");
    const token = jwt.sign(
      { uid: req.body.uid, username: req.body.username },
      secretKey,
      { expiresIn: "1h", algorithm: "HS256" }
    );
    res.send({ token });
  } catch (error) {
    console.log("error /api/login", error);
    res.sendStatus(404);
  }
};
