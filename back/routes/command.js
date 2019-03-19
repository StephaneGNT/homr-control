const express = require('express')
const router = express.Router()
const Command = require('../models/commandModel')

router.get('/', function (req, res, next) {
  Command.find({}).then((data, err) => {
    if (err) res.status(500).json({message: 'Erreur lors de la récupération des données'})
    else res.status(200).send(data)
  })
})

router.get('/:id', function (req, res, next) {
  Command.find({_id: req.params.id}).then((data, err) => {
    if (err) res.status(500).json({message: 'Erreur lors de la récupération des données'})
    else res.status(200).send(data)
  })
})

router.post('/', function (req, res, next) {
  Command.create(req.body).then((data, err) => {
    if (err) res.status(500).json({message: 'Erreur lors de l\'ajout'})
    else res.status(200).send(data)
  })
})

router.delete('/:id', function (req, res, next) {
  Command.findByIdAndDelete({_id: req.params.id}).then((data, err) => {
    if (err) res.status(500).json({message: 'Erreur lors de la suppression'})
    else res.status(200).send(data)
  })
})

router.put('/:id', function (req, res, next) {
  Command.findByIdAndUpdate(req.params.id, req.body).then((data, err) => {
    if (err) res.status(500).json({message: 'Erreur lors de la mise à jour'})
    else res.status(200).send(data)
  })
})

module.exports = router;