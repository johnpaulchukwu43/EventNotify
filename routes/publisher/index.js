const express = require('express');
const router = express.Router();
const topicService = require('../../services/topic-service');
const notificationEngine = require('../../services/notification-engine');


router.get('*', function(req, res) {
    res.status(200).json({ title: 'Publisher here!' });
});


router.post('/subscribe/:topic', function(req, res) {
    topicService.createTopic(req,res);
});


router.post('/publish/:topic',function (req,res) {

    notificationEngine.publishMessage(req,res);
});



module.exports = router;
