// Write your "projects" router here!
const express = require('express');
const { checkFields, allFields } = require('./project-middleware');
const Project = require('./projects-model');

const router = express.Router();

// `[GET] /api/projects` returns an array of projects (or an empty array) as the body of the response.
router.get('/', (req, res, next) => {
    Project.get()
           .then(projects => {
               res.status(200).json(projects);
           })
           .catch(next)
})
// `[GET] /api/projects/:id` returns a project with the given `id` as the body of the _response_.
router.get('/:id', (req, res, next) => {
    const { id } = req.params;
    Project.get(id)
           .then(project => {
               if(!project){
                   res.status(404).json({ message: `project id:${id} not found.`});
               } else {
                   res.status(200).json(project);
               }
           })
           .catch(next)
})
// `[POST] /api/projects` returns the newly created project as the body of the _response_.
router.post('/', checkFields, (req, res, next) => {
    const { body } = req;
    Project.insert(body)
           .then(created => {
               res.status(201).json(created);
           })
           .catch(next)
})
// `[PUT] /api/projects/:id` returns the updated project as the body of the _response_.
router.put('/:id', allFields, (req, res, next) => {
    const { id } = req.params;
    const { body } = req;
    Project.update(id, body)
           .then(updated => {
               res.status(200).json(updated);
           })
           .catch(next)
})
// `[DELETE] /api/projects/:id` returns no _response_ body.
router.delete('/:id', (req, res, next) => {
    const { id } = req.params;
    Project.remove(id)
           .then(del => {
               if(!del){
                   res.status(404).json({ message: `project id:${id} not found.`})
               } else {
                   res.status(200).json({ message: `project id:${id} deleted.`});
               }
           })
           .catch(next)
})

// `[GET] /api/projects/:id/actions` sends an array of actions (or an empty array) as the body of the response.
router.get('/:id/actions', (req, res, next) => {
    const { id } = req.params;
    Project.getProjectActions(id)
           .then(actions => {
               if(!actions){
                   res.status(404).json({ message: `project id:${id} not found.`});
               } else {
                   res.status(200).json(actions);
               }
           })
           .catch(next)
})


router.use((err, req, res, next) => {
    res.status(500).json({
        message: err.message,
        stack: err.stack,
        custom: 'Error in projects-router.'
    })
})

module.exports = router;