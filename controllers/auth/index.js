const jwtHandler = require('../../utils/JWT');
const User = require('../../models/user');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

exports.loginUser = async (req, res, next) => {
  try {
    const { userName, password } = req.body;
    const errors = validationResult(req);
    console.log(req.body, 'body is here');
    if (!errors.isEmpty()) {
      const error = new Error(`${errors.errors[0].msg}`);
      error.data = errors.array();
      error.statusCode = 422;
      throw error;
    }
    //generally i dont write queries and other stuff in controller
    
    const savedUser = await User.findOne({email: userName.toLowerCase()});
    console.log(savedUser,'saveduser')
    if (savedUser) {
      let compare;

      compare = await bcrypt.compare(password, savedUser.password);

      if (compare) {
        // console.log('from compared', compare);
        let token = jwtHandler.getJWT(
          savedUser.email,
          savedUser.name,
          savedUser.id,
        );
        let userDetails = {
          email: savedUser.email,
          id: savedUser.id,
          token,
        };
        return res.status(200).send({
          status: 200,
          data: userDetails,
        });
      } else {
        return res.status(400).send({
          status: 400,
          message: 'Incorrrect Password',
        });
      }
    } else {
      return res.status(400).send({
        status: 400,
        message: `User Doesn't exist`,
      });
    }
  } catch (err) {
    next(err);
  }
};

exports.createNewUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    const { userName, password } = req.body;
    if (!errors.isEmpty()) {
      const error = new Error(`${errors.errors[0].msg}`);
      error.data = errors.array();
      error.statusCode = 422;
      throw error;
    }

    if (userName.match(mailformat)) {
      const hashPassword = await bcrypt.hash(password, 10);

      const userExisting = await User.findOne({
        where: { email: userName },
      });
      if (!userExisting) {
        let newUser = await new User({
          email: userName,
          password: hashPassword,
          isActive: true,
        });
        await newUser.save();
      }

      return res.status(200).send({ status: 200, message: 'User Created' });
    } else {
      return res.status(400).send({ message: 'Enter Valid Email', code: 400 });
    }
  } catch (err) {
    next(err);
  }
};
