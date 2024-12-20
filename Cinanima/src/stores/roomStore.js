import { defineStore } from 'pinia';

export const useRoomStore = defineStore('rooms', {
  state: () => ({
    rooms: [
      {
        idRoom: 1,
        name: 'Room 1',
        capacity: 50,
      },
    ],
  }),

  getters: {
    getRooms: (state) => state.rooms,
  },

  actions: {

  },
  persist: true
});
