// Write your "actions" router here!
const express = require('express');
const Action = require('./actions-model');
const { checkFields } = require('./actions-middleware');
const router = express.Router();

//  `[GET] /api/actions` returns an array of actions (or an empty array) as the body of the _response_.
router.get('/', (req, res, next) => {
    Action.get()
          .then(actions => {
              res.status(200).json(actions);
          })
          .catch(next)
})
//  `[GET] /api/actions/:id` returns an action with the given `id` as the body of the _response_.
router.get('/:id', (req, res, next) => {
    const { id } = req.params;
    Action.get(id)
          .then(action => {
              if(!action){
                  res.status(404).json({ message: `action id:${id} not found.`});
              } else {
                  res.status(200).json(action);
              }
          })
          .catch(next)
})
//  `[POST] /api/actions` returns the newly created action as the body of the _response_.
router.post('/', checkFields, (req, res, next) => {
    const { body } = req;
    Action.insert(body)
          .then(action => {
              res.status(201).json(action);
          })
          .catch(next)
})
//  `[PUT] /api/actions/:id` returns the updated action as the body of the _response_.
router.put('/:id', (req, res, next) => {
    const { id } = req.params;
    const { body } = req;
    if(Object.keys(body).length === 0){
        res.status(400).json({ message: "No element to update" });
    } else {
        Action.update(id, body)
              .then(updated => {
                  if(!updated){
                      res.status(404).json({ message: `action id:${id} not found.`});
                  } else {
                      res.status(200).json(updated);
                  }
              })
              .catch(next)
    }
})
//  `[DELETE] /api/actions/:id` returns no _response_ body.
router.delete('/:id', (req, res, next) => {
    const { id } = req.params;
    Action.remove(id)
          .then(del => {
              res.status(200).json({ message: `action id:${id} deleted.`})
          })
          .catch(next)
})


// catch errors
router.use((err, req, res, next) => {
    res.status(500).json({
        message: err.message,
        stack: err.stack,
        custom: 'Error in actions-router.'
    })
})

module.exports = router;