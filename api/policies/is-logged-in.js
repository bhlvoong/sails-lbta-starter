module.exports = async function (req, res, proceed) {
    if (req.user) {
      return proceed();
    }
  
    //--•
    // Otherwise, this request did not come from a logged-in user.
    sails.log.debug("User not logged in, redirect to login.")
    return res.redirect('/login')
    // return res.status(401).send('Unauthorized');
  
  };