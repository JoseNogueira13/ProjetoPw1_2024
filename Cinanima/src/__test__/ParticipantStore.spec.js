import{beforeEach,describe,it,expect} from 'vitest'
import { setActivePinia, createPinia } from 'pinia';
import { useParticipantStore } from '../stores/participantStore';

describe('Participant Store', () => {
  // Setup Pinia before each test
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('initializes with default state', () => {
    const store = useParticipantStore();
    expect(store.participants).toEqual([
      {
        idParticipant: 1,
        idSession: 1,
        name: 'John Silva',
        age: 25,
      },
    ]);
  });

  it('adds a new participant', () => {
    const store = useParticipantStore();
    const newParticipant = {
      idParticipant: 2,
      idSession: 1,
      name: 'Jane Doe',
      age: 30,
    };

    store.addParticipant(newParticipant);
    expect(store.participants).toContainEqual(newParticipant);
  });

  it('removes a participant by ID', () => {
    const store = useParticipantStore();

    store.removeParticipant(1);
    expect(store.participants).toEqual([]);
  });

  it('updates a participant', () => {
    const store = useParticipantStore();

    const updatedParticipant = {
      idParticipant: 1,
      name: 'John Updated',
      age: 26,
    };

    store.updateParticipant(updatedParticipant);
    expect(store.participants[0]).toEqual({
      idParticipant: 1,
      idSession: 1,
      name: 'John Updated',
      age: 26,
    });
  });

  it('filters participants by session ID', () => {
    const store = useParticipantStore();

    // Add a new participant with a different session ID
    store.addParticipant({
      idParticipant: 2,
      idSession: 2,
      name: 'Jane Doe',
      age: 30,
    });

    const session1Participants = store.getParticipantsBySession(1);
    expect(session1Participants).toEqual([
      {
        idParticipant: 1,
        idSession: 1,
        name: 'John Silva',
        age: 25,
      },
    ]);

    const session2Participants = store.getParticipantsBySession(2);
    expect(session2Participants).toEqual([
      {
        idParticipant: 2,
        idSession: 2,
        name: 'Jane Doe',
        age: 30,
      },
    ]);
  });

  it('fetches a participant by ID', () => {
    const store = useParticipantStore();

    const participant = store.getParticipantById(1);
    expect(participant).toEqual({
      idParticipant: 1,
      idSession: 1,
      name: 'John Silva',
      age: 25,
    });
  });

  it('clears all participants', () => {
    const store = useParticipantStore();

    store.clearParticipants();
    expect(store.participants).toEqual([]);
  });
});
