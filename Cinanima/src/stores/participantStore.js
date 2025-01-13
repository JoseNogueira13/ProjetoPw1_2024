import { defineStore } from 'pinia';

export const useParticipantStore = defineStore('participants', {
  state: () => ({
    participants: [
      {
        idParticipant: 1,
        idSession: 1,
        name: 'John Silva',
        age: 25,
      },
    ],
  }),

  getters: {
    getParticipants: (state) => state.participants,

    getParticipantsBySession: (state) => (sessionId) =>
      state.participants.filter((participant) => participant.idSession === sessionId),

    getParticipantById: (state) => (participantId) =>
      state.participants.find((participant) => participant.idParticipant === participantId),
  },

  actions: {
    addParticipant(participant) {
      this.participants.push(participant);
    },

    removeParticipant(participantId) {
      this.participants = this.participants.filter(
        (participant) => participant.idParticipant !== participantId
      );
    },

    updateParticipant(updatedParticipant) {
      const index = this.participants.findIndex(
        (participant) => participant.idParticipant === updatedParticipant.idParticipant
      );

      if (index !== -1) {
        this.participants[index] = { ...this.participants[index], ...updatedParticipant };
      }
    },

    clearParticipants() {
      this.participants = [];
    },
  },
  persist: true,
});
