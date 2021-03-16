const express = require('express');
const router = express.Router();

router.get('/', (req, res)=> {
  res.status(200).json({ title: 'Subscriber here !' });
});

/*
    Test1 and test2 are defined topics as stated in the requirement document.
    So we listen for broadcasts from the publisher about that topic.
 */
router.post('/test1', (req, res)=> {
    console.log("SUBSCRIBER_APP: Content received from publisher"+JSON.stringify(req.body));
    res.status(200).json();
});

router.post('/test2', (req, res)=> {
    console.log("SUBSCRIBER_APP: Content received from publisher"+JSON.stringify(req.body));
    res.status(200).json();
});


router.get("*", (req, res) => {
    res.send("PAGE NOT FOUND");
});



module.exports = router;
