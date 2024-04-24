var express = require('express');
var router = express.Router();

const models = require('../../models');

router.get('/:id', function (req, res) {
  models.User.findByPk(req.params.id, {
    include: [
      {
        model: models.Children,
        as: 'children',
      },
    ],
  }).then(async (result) => {
    // let data = [];
    // result.forEach(element => {
    //   element.children.forEach(child => {
    //     child.checkup.forEach(check => {
    //       if (check.posyandu.id = req.auth.data.posyandu_id) {
    //         if (!data.includes(element)) {
    //           data.push(element);
    //         }
    //       }
    //     });
    //   });
    // });
    res.status(200).json({
      data: result,
    });
  });
});

module.exports = router;
