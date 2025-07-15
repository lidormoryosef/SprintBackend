const CompanyController = require('../Controller/CompanyController');
const express=require('express');
const controller= CompanyController;
const router=express.Router();
/**
 * @swagger
 * /api/company/getHistoryWork/{id}:
 *   get:
 *     summary: Get History Work of Member.
 *     tags:
 *       - Company
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
router.route('/getHistoryWork/:id').get(controller.getHistoryJobByIdController);
module.exports = router;