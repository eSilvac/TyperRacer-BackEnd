const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Model
const { User, Quote, Race, Participant } = require('../../models/config')

// HandleError
const NewError = require('../errors/handle')

// WS
const connectRaceToWS = require('../../websocket/config')

const resolvers = {
  currentUser: async (args) => {
    const token = args.token; 

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
      const user = await User.findById(quotePayload.userId)
      if (!user) throw new Error('NOT_FOUND'); 

      const quote = await Quote.create({
        ...quotePayload,
        quotePayload, text: clearText(quotePayload.text)  
      });

      return quote;
    } catch (err) {
      throw NewError(err);
    }
  },

  getRace: async (args) => {
    const raceId = args.id; 

    try {
      const race = await Race.findById(raceId);
      if (!race) { throw new Error('NOT_FOUND'); }

      const quoteId = race.quoteId;
      const quote = await Quote.findById(quoteId);
      
      return { race, quote }
    } catch (err) {
      throw new Error('INVALID_ID');
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
      connectRaceToWS(race._id);

      return { race: race, quote: quote };
    } catch (err) {
      throw NewError(err);
    }
  },

  createParticipant: async ({ participantPayload }) => {
    try {
      const participant = await Participant.create(participantPayload);
      const race = await Race.findById(participant.raceId);
      const timing = generateParticipantTiming(participant.createdAt, race.createdAt)

      return { participant, timing };
    } catch (err) {
      throw NewError(err);
    }
  }

}

const clearText = (text) => {
  return text.trim().replace(/(\r\n|\n|\r)/gm, ' ').replace(/\s\s+/g, ' ');
}

const generateParticipantTiming = (participantTime, raceTime) => {
  const difference = Math.floor((participantTime - raceTime) / 1000);
  const toStart = 10 - difference;
  const toEnd = toStart < 0 ? ( 130 - difference ) : 120;
  const current = toStart < 0 ? ( difference - 10 ) : 0;

  return {
    toEnd: toEnd >= 0 ? toEnd : 0,
    toStart: toStart >= 0 ? toStart : 0,
    current: current
  }
}

module.exports = resolvers;
