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
module.exports = router;