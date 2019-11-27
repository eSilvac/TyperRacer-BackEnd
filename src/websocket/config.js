const { Participant } = require('../models/config')

const connectRaceToWS = (raceId) => {
  let participants = [];

  const raceNS = io.of(`/${raceId}`);
  raceNS.on('connection', function (socket) {
    console.log("Se conectaron")

    socket.on('newParticipant', function (data) {
      participants.unshift(data)
      raceNS.emit('participants', { participants: participants })
    });

    socket.on('updateParticipant', function (data) {
      participantUpdate(data, participants)
      participants = participants.map((element) =>
        element.id === data.id ? data : element
      );
      raceNS.emit('participants', { participants: participants })
    });

    socket.on('disconnect', () => {
      console.log("Se desconectaron")
    });  
  })
}

const participantUpdate = async (data, participants) => {
  const filter = { _id: data.id }
  const update = { wpm: data.wpm, progress: data.percentage }
  const arr = await Participant.findOneAndUpdate(filter, update);
}

module.exports = connectRaceToWS;
