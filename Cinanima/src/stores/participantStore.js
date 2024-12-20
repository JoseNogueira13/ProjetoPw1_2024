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
  },

  actions: {

  },
  persist: true
});
