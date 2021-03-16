const Subscriber = require('../models/subscriber');



function createSubscriber(url){
    return new Promise((resolve,reject)=> {

        const subscriber = new Subscriber({
            url:url
        });

        subscriber.save((err, data)=>{
            if (err) {
                console.log("PUBLISHER_APP: error:"+err);
                reject({
                    success: false,
                    message: 'An error occurred',
                    error: err
                })
            }else{
                resolve({
                    success: true,
                    message: 'Subscriber has been created',
                    data:data,
                    id: subscriber._id
                })
            }
        });
    })
}

module.exports = {
    createSubscriber
};
