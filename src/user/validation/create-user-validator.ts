import { Request, Response, NextFunction } from "express";

const { body, validationResult } = require('express-validator');

// Define validation rules for creating a new User
export const validateCreateUserRequest = [
  body('firstname')
    .notEmpty()
    .withMessage('First name is required')
    .isLength({ max: 50 })
    .withMessage('First name cannot be longer than 50 characters'),
  body('lastname')
    .notEmpty()
    .withMessage('Last name is required')
    .isLength({ max: 50 })
    .withMessage('Last name cannot be longer than 50 characters'),
  body('username')
    .notEmpty()
    .withMessage('Username is required')
    .isLength({ min: 3, max: 20 })
    .withMessage('Username must be between 3 and 20 characters')
    .isAlphanumeric()
    .withMessage('Username must be alphanumeric'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Email must be a valid email address'),
  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive must be a boolean value'),
  body('bio')
    .optional()
    .isLength({ max: 250 })
    .withMessage('Bio cannot be longer than 250 characters'),
];

// Middleware to handle validation errors
export const handleValidationErrors = (
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorArray = errors.array().map((error: { msg: string; }) => error.msg);
      res.status(400).json({ hasErrors: true, errors: errorArray });
      return;
    }
    next();
};
