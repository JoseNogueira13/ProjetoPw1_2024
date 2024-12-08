import { defineStore } from 'pinia';

export const useFilmStore = defineStore('films', {
  state: () => ({
    filmes: 
    [
      {
        idFilm: 1,
        nome: 'O Senhor dos Anéis',
        genero: 'Fantasia',
        duracao: 180,
        faixaEtaria: 14,
        diretor: 'Peter Jackson',
      },
    ],
    //filme: {}
    salas: 
    [
      {
        idSala: 1,
        nome: 'Sala 1',
        capacidade: 50,
      },
    ],
    //sala: {}
    sessoes: 
    [
      {
        idSessao: 1,
        idFilme: 1,
        idSala: 1,
        horario: '14:00',
      },
    ],
    //sessao: {}
    participantes: 
    [
      {
        idParticipante: 1,
        idSessao: 1,
        nome: 'João Silva',
        idade: 25,
      },
    ],
    //participante: {}
  }),

  getters: {

  },

  actions: {

  },
});
