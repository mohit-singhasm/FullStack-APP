const admin_middleware = async (req, res, next) => {
    try {
        let admin = req.user.isAdmin;
        if(!admin){
            return res.status(403).json({message : 'Access Denied. User is not an admin'})
        }
        next();
    } catch (error) {
        console.log(error)
    }
}

export default admin_middleware