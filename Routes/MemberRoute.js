const memberController = require('../Controller/MemberController');
const express=require('express');
const controller= memberController;

const router=express.Router();
/**
 * @swagger
 * /api/members/getPageMembers/{page}:
 *   get:
 *     summary: Get members by page.
 *     tags:
 *       - Members
  *     parameters:
 *       - in: path
 *         name: page
 *         required: true
 *         schema:
 *           type: string
 *         description: Page Number
 *     responses:
 *       200:
 *         description: Successful.
 *       400:
 *         description: Error in request.
 *       500:
 *         description: Error in Server.
 */
router.route('/getPageMembers/:page').get(controller.getMembersPageController);
/**
 * @swagger
 * /api/members/getPageSortMembers/{page}/{fieldSort}:
 *   get:
 *     summary: Get members by page.
 *     tags:
 *       - Members
  *     parameters:
 *       - in: path
 *         name: page
 *         required: true
 *         schema:
 *           type: string
 *         description: Page Number
  *       - in: path
 *         name: fieldSort
 *         required: true
 *         schema:
 *           type: string
 *         description: The field That we want to sort by.
 *     responses:
 *       200:
 *         description: Successful.
 *       400:
 *         description: Error in request.
 *       500:
 *         description: Error in Server.
 */
router.route('/getPageSortMembers/:page/:fieldSort').get(controller.getMembersSortPageController);
/**
 * @swagger
 * /api/members/getMembersByGroupId/{page}/{groupId}:
 *   get:
 *     summary: Get members by page.
 *     tags:
 *       - Members
  *     parameters:
 *       - in: path
 *         name: page
 *         required: true
 *         schema:
 *           type: string
 *         description: Page Number
  *       - in: path
 *         name: groupId
 *         required: true
 *         schema:
 *           type: string
 *         description: The id of the group that we want to see the members.
 *     responses:
 *       200:
 *         description: Successful.
 *       400:
 *         description: Error in request.
 *       500:
 *         description: Error in Server.
 */
router.route('/getMembersByGroupId/:page/:groupId').get(controller.getMembersByGroupIdPageController);
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
 * /api/members/postDetailsFromLinkedIn:
 *   post:
 *     summary: Get Details From LinkedIn profile.
 *     tags:
 *       - Members
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               linkedin_url:
 *                 type: string
 *                 example: "linkedIn"
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
router.route('/postDetailsFromLinkedIn').post(controller.saveDetailsFromLinkedInController);
/**
 * @swagger
 * /api/members/addOrUpdateMember:
 *   post:
 *     summary: Add member or update.
 *     tags:
 *       - Members
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               full_name:
 *                 type: string
 *                 example: "John Doe"
 *               english_name:
 *                 type: string
 *                 example: "John"
 *               picture:
 *                 type: string
 *                 format: uri
 *                 example: "https://example.com/images/john.jpg"
 *               phone:
 *                 type: string
 *                 example: "+123456789"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "john@example.com"
 *               city:
 *                 type: string
 *                 example: "New York"
 *               role:
 *                 type: string
 *                 example: "Developer"
 *               current_company:
 *                 type: string
 *                 example: "Acme Corp"
 *               years_of_experience:
 *                 type: integer
 *                 example: 5
 *               linkedin_url:
 *                 type: string
 *                 description: "URL to LinkedIn profile"
 *                 example: "https://linkedin.com/in/johndoe"
 *               facebook_url:
 *                 type: string
 *                 example: "https://facebook.com/johndoe"
 *               community_value:
 *                 type: string
 *                 example: "Active member"
 *               additional_info:
 *                 type: string
 *                 example: "Some extra info about the member"
 *               skills:
 *                 type: string
 *                 example: "JavaScript, Node.js, SQL"
 *               wants_updates:
 *                 type: boolean
 *                 example: true
 *               admin_notes:
 *                 type: string
 *                 example: "Notes for admins only"
 *             required:
 *               - full_name
 *               - email
 *               - linkedInProfile
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
/**
 * @swagger
 * /api/members/getBiggestCity:
 *   get:
 *     summary: Get The Biggest city and the size.
 *     tags:
 *       - Members
 *     responses:
 *       200:
 *         description: Successful.
 *       500:
 *         description: Error in Server.
 */
router.route('/getBiggestCity').get(controller.getBiggestCityController);
/**
 * @swagger
 * /api/members/saveMembers:
 *   post:
 *     summary: Save members from uploaded Excel (base64) file.
 *     tags:
 *       - Members
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               base64:
 *                 type: string
 *                 description: Base64-encoded ODS or Excel file.
 *     responses:
 *       200:
 *         description: Members saved successfully.
 *       500:
 *         description: Internal server error.
 */

router.route('/saveMembers').post(controller.saveMembersFromExcelController);
/**
 * @swagger
 * /api/members/saveMembersFromLinkedinFile:
 *   post:
 *     summary: Extract details from linkedin and save in db for each row in file.
 *     tags:
 *       - Members
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               base64:
 *                 type: string
 *                 description: Base64-encoded ODS or Excel file.
 *     responses:
 *       200:
 *         description: Members saved successfully.
 *       500:
 *         description: Internal server error.
 */

router.route('/saveMembersFromLinkedinFile').post(controller.saveMembersFromExcelLinkedinController);
/**
 * @swagger
 * /api/members/getMemberInclude/{word}:
 *   get:
 *     summary: Search in data Base rows that contains word.
 *     tags:
 *       - Members
 *     parameters:
 *       - in: path
 *         name: word
 *         required: true
 *         schema:
 *           type: string
 *         description: Word we want to search
 *     responses:
 *       200:
 *         description: Members saved successfully.
 *       500:
 *         description: Internal server error.
 */

router.route('/getMemberInclude/:word').get(controller.getMemberIncludeWordController);

module.exports = router;