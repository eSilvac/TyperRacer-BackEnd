const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Model
const { User, Quote, Race } = require('../../models/config')
// HandleError
const NewError = require('../errors/handle')

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
        throw new Error('NOT_FOUND');
      }
    } catch (err) {
      throw new Error('INVALID_TOKEN');
    }
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
      throw NewError(err);
    }
  }, 

  loginUser: async ({ userPayload }) => {
    try {
      const user = await User.findOne({ username: userPayload.username })
      
      if (user) {
        const isValidPassword = bcrypt.compareSync(
          userPayload.password,
          user.password
        );

        if (!isValidPassword) {
          throw new Error('FORBIDDEN');
        }

        const token = jwt.sign({
          userId: user._id,
          exp: Math.floor(Date.now() / 1000) + (60 * 60)
        }, process.env.JWT_SECRET);
        
        return { token };
      } else {
        throw new Error('NOT_FOUND');
      }
        
    } catch (err) {
      throw NewError(err);
    }
  },

  createQuote: async ({ quotePayload }) => {
    try {
      const user = await User.findById(quotePayload)

      if (!user) throw new Error('NOT_FOUND'); 
      if (!user.admin) throw new Error('FORBIDDEN'); 

      const quote = await Quote.create(quotePayload);
      return quote;
    } catch (err) {
      throw NewError(err);
    }
  },

  createRace: async ({ racePayload }) => {

    try {
      if (racePayload.userId) {
        const user = await User.findById(racePayload.userId)
        if (!user) throw new Error('NOT_FOUND');
        
        racePayload['userId'] = user._id;
      }

      const quotes = await Quote.find({ language: racePayload.language });
      if (quotes.length === 0) throw new Error('QUOTE_NOT_FOUND');
      
      const randomNumber = Math.floor(Math.random() * quotes.length);
      const quote = quotes[randomNumber];

      racePayload['quoteId'] = quote._id;
      const race = await Race.create(racePayload);

      return { race: race, quote: quote };
    } catch (err) {
      throw NewError(err);
    }
  }
}

module.exports = resolvers;
