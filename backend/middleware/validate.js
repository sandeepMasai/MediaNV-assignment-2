import { body, validationResult } from "express-validator";

export const candidateValidation = [
  body("name").notEmpty(),
  body("age").isInt({ min: 18 }),
  body("email").isEmail(),
];

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
