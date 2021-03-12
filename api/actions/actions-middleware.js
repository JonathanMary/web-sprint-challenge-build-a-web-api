//const Action = require('./actions-model');

const checkFields = async(req, res, next) => {
    try {
        const { body } = req;
        console.log("Inside Check ID, req:", body);
        if( !body.project_id || !body.description || !body.notes ){
            res.status(400).json({ message: "Required field missing." });
        } else {
            console.log("** checkFields Passed. **")
            next();
        }
    } catch (err) { next(err) }
}

module.exports = {
    checkFields,
};