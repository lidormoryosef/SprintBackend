const memberController = require('../Controller/MemberController');
const express=require('express');
const controller= memberController;

const router=express.Router();
/**
 * @swagger
 * /api/members/getAllMembers:
 *   get:
 *     summary: Get all members.
 *     tags:
 *       - Members
 *     responses:
 *       200:
 *         description: Successful.
 *       400:
 *         description: Error in request.
 *       500:
 *         description: Error in Server.
 */
router.route('/getAllMembers').get(controller.getAllMembersController);
/**
 * @swagger
 * /api/members/getMemberById/{id}:
 *   get:
 *     summary: Get details of a member by ID.
 *     tags:
 *       - Members
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the member
 *     responses:
 *       200:
 *         description: Member found.
 *       404:
 *         description: Member ID does not exist.
 *       500:
 *         description: Server error.
 */
router.route('/getMemberById/:id').get(controller.getMemberByIdController);

/**
 * @swagger
 * /api/members/updateMemberById/{id}:
 *   put:
 *     summary: Update details for a member by ID.
 *     tags:
 *       - Members
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the member to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               age:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Member updated successfully.
 *       404:
 *         description: Member ID does not exist.
 *       500:
 *         description: Server error.
 */
router.route('/updateMemberById/:id').put(controller.updateMemberByIdController);

module.exports = router;