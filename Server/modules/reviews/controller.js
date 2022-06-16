const express = require('express');
const os = require('os');
const multer = require('multer');

const helper = require('../../helper/convert');
const Review = require('./models');

const router = express.Router();
const upload = multer({ dest: os.tmpdir() });


router.post('/getData', (req, res) => {
    let body = req.body;
    if(body.reviewed_date){
        console.log(body.reviewed_date);
        let date = helper.convertDate(body.reviewed_date);

        body.reviewed_date = {
            $gte: new Date(date.start),
            $lt: new Date(date.end)
        }
    }
    Review.find(body).then(data => {
        console.log(data.length);
        res.json(data);
    }).catch((error) => {
        res.send(error);
    });
});

router.post('/upload', upload.single('file'), async (req, res) => {
    const file = req.file;
    let fileName = file.originalname;
    console.log(fileName);

    let jsonData = await helper.jsonData(file.path);

    Review.insertMany(jsonData).then(() => {
        res.send('Data inserted');
    }).catch((error) => {
        res.send(error);
    });
});


// Filter List
router.get('/getFilterList/:filter', (req, res) => {
    let filter = req.params.filter;
    Review.distinct(filter).then(data => {
        res.json(data);
    }).catch((error) => {
        res.send(error);
    });
});

router.get('/getCount', (req, res) => {
    let pipeline = [{
        $group: {
            _id: '$rating',
            count: {
                $sum: 1
            }
        }
    }, {
        $project: {
            rating: '$_id',
            count: '$count'
        }
    }, {
        $unset: '_id'
    }, {
        $sort: {
            rating: 1
        }
    }];

    Review.aggregate(pipeline).then(data => {
        res.json(data);
    }).catch((error) => {
        res.send(error);
    });
});

router.get('/getAverage', (req, res) => {
    let pipeline = [{
        $project: {
            month: {
                $month: '$reviewed_date'
            },
            year: {
                $year: '$reviewed_date'
            },
            review_source: '$review_source',
            // rating: 1
            rating: '$rating'
        }
    }, {
        $group: {
            _id: {
                month: '$month',
                year: '$year',
                review_source: '$review_source'
            },
            // total : {$sum : "$rating"},
            average: {
                $avg: '$rating'
            }
        }
    }, {
        $project: {
            month: '$_id.month',
            year: '$_id.year',
            review_source: '$_id.review_source',
            average: '$average'
        }
    }, {
        $unset: '_id'
    }]

    Review.aggregate(pipeline).then(data => {
        res.json(data);
    }).catch((error) => {
        res.send(error);
    });
});


module.exports = router;