// project middleware!
const checkFields = (req, res, next) => {
    const { body } = req;
    try {
        if(!body.name || !body.description){
            res.status(400).json({ message: "Required fields missing."});
        } else {
            next();
        }
    } catch (err) { next(err)}
}
const allFields = (req, res, next) => {
    const { body } = req;
    try {
        if(!body.name && !body.description){
            res.status(400).json({ message: "No element to update."});
        } else {
            next();
        }
    } catch (err) { next(err)}
}

module.exports= {
    checkFields,
    allFields,
}