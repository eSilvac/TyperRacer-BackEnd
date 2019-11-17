const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Model
const User = require('../../models/user');

const resolvers = {
  currentUser: async (args) => {
    const token = args.token    

    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      const userId = payload.userId;
      const user = await User.findById(userId);
      if (user) {
        return user;
      } else {
        res.status(204).json({ msg: "User not found" });
      }
    } catch (err) {
      throw new Error('INVALID_TOKEN');
    }
    console.log(args)
  },

  registerUser: async ({ userPayload }) => {
    const password = userPayload.password ? bcrypt.hashSync(userPayload.password, 10) : '';
    
    try {
      const user = await User.create({
        username: userPayload.username,
        email: userPayload.email,
        password
      });

      const token = jwt.sign({
        userId: user._id,
        exp: Math.floor(Date.now() / 1000) + (60 * 60)
      }, process.env.JWT_SECRET);
      
      return { token };
    } catch (err) {
        console.log(err.errors.email)
    }
  }, 

  loginUser: async ({ userPayload }) => {
    try {
      const user = await User.findOne({ username: userPayload.username })

      const isValidPassword = bcrypt.compareSync(
        userPayload.password,
        user.password
      );

      if (!isValidPassword) {
        res.status(403).res('Usuario o contraseña invalido');
        return;
      }
      
      if (user) {
        const token = jwt.sign({
          userId: user._id,
          exp: Math.floor(Date.now() / 1000) + (60 * 60)
        }, process.env.JWT_SECRET);
        
        return { token };
      } else {
        res.status(404).json({ error: "User not found." });
      }
        
    } catch (err) {
      console.log(err.message) 
    }
  }
}

module.exports = resolvers;
