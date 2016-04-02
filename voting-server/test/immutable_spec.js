import { expect } from 'chai'
import { List, Map } from 'immutable'

describe('Immutability',() => {
  describe('a Number', () => {
    function increment(value) {
      return value + 1;
    }
    it('is immutable', () => {
      const state = 42;
      const nextState = increment(state);

      expect(state).to.equal(42);
      expect(nextState).to.equal(43);
    })
  })

  describe('a List', () => {
    function addMovie(currentState, movie) {
      return currentState.push(movie);
    }

    it('is immutable', () => {
      const initialList = List.of('Trainspotting', '28 days later');
      const listAfter = addMovie(initialList, 'Sunshine');

      expect(initialList).to.equal(List.of(
          'Trainspotting',
          '28 days later'
        ));
      expect(listAfter).to.equal(List.of(
          'Trainspotting',
          '28 days later',
          'Sunshine'
        ));
    })
  })

  describe('a Tree', () => {
    function addMovie(state, movie) {
      return state.set('movies', state.get('movies').push(movie));
    }

    it('is immutable', () => {
      const state = Map({
        movies: List.of('Trainspotting', '28 days later')
      });
      const nextState = addMovie(state, 'Sunshine');

      expect(nextState).to.equal(Map({
        movies: List.of(
          'Trainspotting',
          '28 days later',
          'Sunshine'
        )
      }));

      expect(state).to.equal(Map({
        movies: List.of(
          'Trainspotting',
          '28 days later'
        )
      }));
    })
  })
})
