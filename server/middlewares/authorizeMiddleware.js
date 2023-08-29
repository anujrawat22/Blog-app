

const authorize = (roles) => {
    return (req, res, next) => {
        const role = req.role;
        try {
            if (roles.includes(role)) {
                next()
            } else {
                return res.status(403).send({ err: "Acess denied" })
            }
        } catch (error) {
            console.log("authorization error : ", error);

        }
    }
}

module.exports = { authorize }