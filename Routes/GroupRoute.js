const groupController = require('../Controller/GroupController');
const express=require('express');
const controller= groupController;
const router=express.Router();
/**
 * @swagger
 * /api/groups/getCountGroups:
 *   get:
 *     summary: Get count of all groups.
 *     tags:
 *       - Groups
 *     responses:
 *       200:
 *         description: Successful.
 *       500:
 *         description: Error in Server.
 */
router.route('/getCountGroups').get(controller.getCountOfGroupsController);
/**
 * @swagger
 * /api/groups/getAllGroups:
 *   get:
 *     summary: Get all groups.
 *     tags:
 *       - Groups
 *     responses:
 *       200:
 *         description: Successful.
 *       500:
 *         description: Error in Server.
 */
router.route('/getAllGroups').get(controller.getAllGroupsController);
/**
 * @swagger
 * /api/groups/getGroupsById/{id}:
 *   get:
 *     summary: Get all groups by id.
 *     tags:
 *       - Groups
  *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the member
 *     responses:
 *       200:
 *         description: Successful.
 *       500:
 *         description: Error in Server.
 */
router.route('/getGroupsById/:id').get(controller.getAllGroupsByIdController);
module.exports = router;