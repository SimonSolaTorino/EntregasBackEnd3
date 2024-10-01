export const isAuthenticated = (req, res, next)=>{
    if(req.session.userId){
        return next()
    }
    res.redirect('/login')
}

export const isAdmin = (req, res, next)=>{
    if(req.session.userRole === 'admin'){
        return next()
    }
    res.status(403).render('notallowed')}