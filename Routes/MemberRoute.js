const memberController = require('../Controller/MemberController');
const express=require('express');
const controller= memberController;

const router=express.Router();
/**
 * @swagger
 * /api/members/getMembers:
 *   get:
 *     summary: Get all members.
 *     tags:
 *       - Members
*     parameters:
 *         schema:
 *           type: string
 *         description: The num of page
 *     responses:
 *       200:
 *         description: Successful.
 *       400:
 *         description: Error in request.
 *       500:
 *         description: Error in Server.
 */
router.route('/getMembers').get(controller.getMembersController);
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
*       400:
 *         description: Error in request.
 *       404:
 *         description: Member ID does not exist.
 *       500:
 *         description: Server error.
 */
router.route('/getMemberById/:id').get(controller.getMemberByIdController);
/**
 * @swagger
 * /api/members/addMember:
 *   get:
 *     summary: Add member.
 *     tags:
 *       - Members
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               linkedInProfile:
 *                 type: string
 *     responses:
 *       200:
 *         description: Member saved.
*       400:
 *         description: Error in request.
 *       500:
 *         description: Server error.
 */
router.route('/addOrUpdateMember').post(controller.addOrUpdateMemberController);
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
 *       400:
 *         description: Error in request.
 *       404:
 *         description: Member ID does not exist.
 *       500:
 *         description: Server error.
 */
router.route('/updateMemberById/:id').put(controller.updateMemberByIdController);

/**
 * @swagger
 * /api/members/deleteMemberById/{id}:
 *   delete:
 *     summary: Delete member by ID.
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
 *         description: Member deleted.
 *       404:
 *         description: Member ID does not exist.
 *       500:
 *         description: Server error.
 */
router.route('/deleteMemberById/:id').delete(controller.deleteMemberByIdController);
/**
 * @swagger
 * /api/members/getCountMembers:
 *   get:
 *     summary: Get count of all members.
 *     tags:
 *       - Members
 *     responses:
 *       200:
 *         description: Successful.
 *       500:
 *         description: Error in Server.
 */
router.route('/getCountMembers').get(controller.getCountOfMembersController);
module.exports = router;