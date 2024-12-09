import { defineStore } from 'pinia';

export const useFilmeStore = defineStore('filmes', {
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
    salas:
    [
      {
        idSala: 1,
        nome: 'Sala 1',
        capacidade: 50,
      },
    ],
    sessoes:
    [
      {
        idSessao: 1,
        idFilme: 1,
        idSala: 1,
        horario: '14:00',
      },
    ],
    participantes:
    [
      {
        idParticipante: 1,
        idSessao: 1,
        nome: 'João Silva',
        idade: 25,
      },
    ],
  }),

  getters: {
    getFilmes: (state) => state.filmes,
    getfilme: (state) => (id) => state.filmes.find(filme => filme.id === id),
    getSalas: (state) => state.salas,
    getSala: (state) => (id) => state.salas.find(sala => sala.id === id),
    getSessoes: (state) => state.sessoes,
    getSessao: (state) => (id) => state.sessoes.find(sessao => sessao.id === id),
  },

  actions: {

  },
  persist: true
});
