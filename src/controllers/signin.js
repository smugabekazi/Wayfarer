/* login */
  static login(req, res) {
    // Validate inputs
    let checkInput = false;
    checkInput = Validate.email(req.body.email, true);
    if (checkInput.isValid === false) {
      return res.status(400).json({
        status: 400,
        error: checkInput.error,
      });
    }
    let isUser = {};
    users.forEach((user) => {
      if (user.email === req.body.email && user.password === req.body.password) {
        isUser = {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          registered: user.registered,
          isAdmin: user.isAdmin,
        };
      }
    });
    if (Object.keys(isUser).length > 0) {
      return res.status(200).json({
        status: 200,
        data: isUser,
      });
    }
    return res.status(404).json({
      status: 404,
      error: 'User not found!',
    });
  }