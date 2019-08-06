import users from '../models/users';
import Validate from '../helpers/validate';

class User {
  static checkUserInputs(userId) {
    let checkUser = {};
    for (const key in users) {
      if (users[key].id === userId) {
        checkUser = {
          id: users[key].id,
          firstName: users[key].firstName,
          lastName: users[key].lastName,
          email: users[key].email,
          password: users[key].password,
          registered: new Date(users[key].registered).toDateString(),
          isAdmin: users[key].isAdmin,
        };
      }
    }

    return checkUser;
  }

  /* signup */
  static signup(req, res) {
    // Validate inputs
    const checkUserInputs = [];
    checkUserInputs.push(Validate.string(req.body.firstName, true));
    checkUserInputs.push(Validate.string(req.body.lastName, true));
    checkUserInputs.push(Validate.email(req.body.email, true));
    checkUserInputs.push(Validate.password(req.body.password, true));

    for (let i = 0; i < checkUserInputs.length; i += 1) {
      if (checkUserInputs[i].isValid === false) {
        return res.status(400).json({
          status: 400,
          error: checkUserInputs[i].error,
        });
      }
    }

    const newUser = {
      id: Math.ceil(Math.random() * 100),
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      registered: Date.now(),
      isAdmin: req.body.isAdmin,
    };

    users.push(newUser);

    const isCreated = User.checkUserInputs(newUser.id);

    if (Object.keys(isCreated).length > 0) {
      return res.status(201).json({
        message: 'The user was created successfully',
        status: 201,
        data: isCreated,
      });
    }

    return res.status(400).json({
      status: 400,
      error: 'User not created!',
    });
  }
}

export default User;