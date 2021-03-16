const Topic = require('../models/topic');
const subscriberService = require('../services/subscriber-service');


const validateRequest = (req, res)=> {
    const topic = req.params.topic;
    const url = req.body.url;

    if (!url) {
        res.status(400).json({success: false, message: 'Url is a required field.'});
    }

    if (!topic) {
        res.status(400).json({success: false, message: 'topic is a required param.'});
    }

    return true;
};

const persistTopicData = (res, topicData)=> {
    const subscriberData = topicData.subscriber.data;
    /*
    * So we create topic model if it does not exist.
    * If it already exists, then we just do an update of the existing subscribers list.
    * */
    Topic.findOneAndUpdate({name: topicData.name},
        {$push: {subscribers: subscriberData._id}},
        {new: true, upsert: true}).exec()
        .then((data) => {
            res.status(200).json({
                success: true,
                url:subscriberData.url,
                topic:topicData.name
            });
        })
        .catch(function (err) {
            console.log("PUBLISHER_APP: Error while persisting topic:"+err);
            res.status(500).json({
                success: false,
                message: 'An error occurred',
                error: err
            });
        });
};


function createTopic(req, res) {

    validateRequest(req, res);

    const url = req.body.url;
    const topic = req.params.topic;

    /*
    *  Fist we save the subscriber object to db and get the ID returned
    *  Next, save the Topic with the subscriber ID attached.
    * */

    subscriberService.createSubscriber(url)
        .then(function (data) {
            const topicData = {name: topic, subscriber: data};
            persistTopicData(res, topicData);

        }).catch(function (err) {
        console.log("PUBLISHER_APP: error while creating subscriber:" + err);
        res.status(500).json({
            success: false,
            message: 'An error occurred while creating Topic',
            error: err
        });
    });
}

const getTopicByName = (topicName) =>{
    return Topic.findOne({name: topicName})
        .populate("subscribers")
        .exec()
};


module.exports = {
    createTopic,
    getTopicByName
};
