const express = require('express')
const router = express.Router()
const Appliance = require('../models/appliance-model')

router.get('/', function (req, res, next) {
  Appliance.find({}).then((data, err) => {
    if (err) res.status(500).json({message: 'Erreur lors de la récupération des données'})
    else res.status(200).send(data)
  })
})

router.get('/plugs', function (req, res, next) {
  Appliance.find({type: "plug"}).then((data, err) => {
    if (err) res.status(500).json({message: 'Erreur lors de la récupération des données'})
    else res.status(200).send(data)
  })
})

router.get('/stores', function (req, res, next) {
  Appliance.find({type: "store"}).then((data, err) => {
    if (err) res.status(500).json({message: 'Erreur lors de la récupération des données'})
    else res.status(200).send(data)
  })
})

router.get('/:id', function (req, res, next) {
  Appliance.find({_id: req.params.id}).then((data, err) => {
    if (err) res.status(500).json({message: 'Erreur lors de la récupération des données'})
    else res.status(200).send(data)
  })
})

module.exports = router;
