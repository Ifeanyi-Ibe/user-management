import express from 'express';
import { validateCreateUserRequest, handleValidationErrors } from './validation/create-user-validator';
import { validateLoginRequest  } from './validation/login-request-validator';
import { UserController } from './user.controller'

const router = express.Router();

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *               bio:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully.
 */
router.post('/', validateCreateUserRequest, handleValidationErrors, UserController.createUser);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Retrieve a list of users
 *     responses:
 *       200:
 *         description: A list of users.
 */
router.get('/', UserController.getUsers);

router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);
router.post('/create-profile', UserController.saveUserProfile);
router.post('/update-profile', UserController.updateProfile);
router.post('/login', validateLoginRequest, handleValidationErrors, UserController.login);

export default router;
