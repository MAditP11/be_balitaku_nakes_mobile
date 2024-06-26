var express = require('express');
var router = express.Router();
const models = require('../../models');

router.get('/', async function (req, res) {
  models.Posyandu.findAll({}).then((result) => {
    res.json({
      data: result,
    });
  });
});

router.get('/filter_status', async function (req, res) {
  models.Posyandu.findAll({}).then((result) => {
    const aktif = result.filter((val) => val.status === 'Aktif');
    const non_aktif = result.filter((val) => val.status === 'Nonaktif');

    let aktiff = [];
    aktif.forEach((element) => {
      aktiff.push(element);
    });

    let non_aktiff = [];
    non_aktif.forEach((element) => {
      non_aktiff.push(element);
    });

    res.status(200).json({
      data: {
        aktif: aktiff,
        non_aktif: non_aktiff,
      },
    });
  });
});

router.post('/create', async function (req, res) {
  const { name, city, district, village, address, pic, phone, status, latitude, longitude } = req.body;
  try {
    models.Posyandu.create({
      name: name,
      city: city,
      district: district,
      village: village,
      address: address,
      pic: pic,
      phone: phone,
      status: status,
      latitude: latitude,
      longitude: longitude,
    }).then((result) => {
      return res.json({
        status: true,
        data: result,
      });
    });
  } catch (error) {
    console.log(error);
  }
});

router.get('/:id', async function (req, res) {
  models.Posyandu.findOne({
    where: {
      id: req.params.id,
    },
  }).then((result) => {
    res.json({
      data: result,
    });
  });
});

router.put('/update/:id', async function (req, res) {
  models.Posyandu.update(
    {
      name: req.body.name,
      phone: req.body.phone,
      village: req.body.village,
      district: req.body.district,
      city: req.body.city,
      address: req.body.address,
      pic: req.body.pic,
      status: req.body.status,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
    },
    { where: { id: req.params.id } },
  ).then((result) => {
    res.json({
      status: true,
      msg: 'success',
      data: result,
    });
  });
});

module.exports = router;
