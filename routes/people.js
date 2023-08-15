const express = require('express');
const router = express.Router();
const Person = require('../models/person');

router.post('/create', (req, res) => {
  const newPerson = new Person(req.body);
  newPerson.save()
    .then(person => {
      res.json(person);
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
});

router.get('/findByName', (req, res) => {
  const name = req.query.name;
  Person.find({ name })
    .then(people => {
      res.json(people);
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
});

router.get('/findByFavoriteFood', (req, res) => {
  const favoriteFood = req.query.food;
  Person.findOne({ favoriteFoods: favoriteFood })
    .then(person => {
      res.json(person);
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
});

router.get('/findById/:id', (req, res) => {
  const personId = req.params.id;
  Person.findById(personId)
    .then(person => {
      res.json(person);
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
});

router.put('/updateFavoriteFoods/:id', (req, res) => {
  const personId = req.params.id;
  const newFavoriteFood = 'Hamburger';

  Person.findById(personId)
    .then(person => {
      person.favoriteFoods.push(newFavoriteFood);
      return person.save();
    })
    .then(updatedPerson => {
      res.json(updatedPerson);
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
});

router.put('/updateAgeByName', (req, res) => {
  const personName = req.query.name;
  const newAge = 20;

  Person.findOneAndUpdate({ name: personName }, { age: newAge }, { new: true })
    .then(updatedPerson => {
      res.json(updatedPerson);
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
});

router.delete('/deleteById/:id', (req, res) => {
  const personId = req.params.id;
  Person.findByIdAndRemove(personId)
    .then(removedPerson => {
      res.json(removedPerson);
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
});

router.delete('/deleteByName', (req, res) => {
  const name = req.query.name;
  Person.remove({ name })
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
});

module.exports = router;