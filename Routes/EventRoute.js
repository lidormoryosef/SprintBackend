const eventController = require('../Controller/EventController');
const express=require('express');
const controller= eventController;
const router=express.Router();
/**
 * @swagger
 * /api/event/getEventsById/{id}:
 *   get:
 *     summary: Get all events of member.
 *     tags:
 *       - Event
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
router.route('/getEventsById/:id').get(controller.getEventsByIdController);
module.exports = router;