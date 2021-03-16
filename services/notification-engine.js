const topicService = require('../services/topic-service');

const axios = require('axios').default;


const validateRequest = (req, res)=> {
    const topic = req.params.topic;
    const content = req.body;

    if (!content) {
        res.status(400).json({success: false, message: 'No message specified.'});
    }

    if (!topic) {
        res.status(400).json({success: false, message: 'topic is a required param.'});
    }

    return true;
};

const publishMessage = (req,res) =>{

    validateRequest(req,res);

    const topicName = req.params.topic;

    const content = req.body;

    topicService.getTopicByName(topicName)
     .then((topic)=> {
         if(topic && topic.subscribers){
             sendNotificationToSubscribers(topic,content,res);
         }else{
             /*
            * No interested subscribers.
            * */
             res.status(200).json({success:true, message:"Broadcast sent, but no interested subscribers."})
         }
     })
     .catch((error)=>{
         console.log("Error occurred while posting notification"+error);
     })

};

const sendNotificationToSubscribers = (topic,message,res) =>{

    let notificationPromises = [];
    const requestBody = {topic:topic.name,data:message};

    let subscribers = topic.subscribers;

    subscribers.forEach(subscriber =>{
        notificationPromises.push(
            axios.post(subscriber.url,requestBody)
        )
    });

    Promise.all(notificationPromises)
        .then((result)=>{
            res.status(200).json({success:true, message:"Broadcast Success!"})
        })
        .catch((error)=> {
            if(error && error.config){
                const url  = error.config.url;
                console.log("PUBLISHER_APP: "+url+error.message);
            }
            /*
            * Broad cast sent but maybe the subscriber is not reachable.
            * */
            res.status(500).json({success:false, message:"Broadcast sent, but not acknowledged by subscribers." +
                    "Confirm Subscriber urls are correct and it's up and running. "})
        })
};






module.exports = {
    publishMessage
};
