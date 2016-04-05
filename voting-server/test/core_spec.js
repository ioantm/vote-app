import { expect } from 'chai'
import { List, Map } from 'immutable'
import { setEntries, next, vote } from '../src/core';

describe('application logic', () => {
  describe('set entries', () => {
    it('add entries to the state', () => {
      const state = Map();
      const entries = List.of('Trainspotting', '28 days later');
      const nextState = Map({
        entries: List.of('Trainspotting', '28 days later')
      });

      expect(setEntries(state, entries)).to.equal(nextState);
    })

    it('converts to immutable', () => {
      const state = Map();
      const entries = ['Trainspotting', '28 days later'];
      const nextState = Map({
        entries: List.of(
          'Trainspotting',
          '28 days later'
        )
      })

      expect(setEntries(state, entries)).to.equal(nextState);
    })
  })

  describe('next', () => {
    it('set next two pairs to be voted on', () => {
      const state = Map({
        entries: List.of(
          'Trainspotting',
          '28 days later',
          'Sunshine'
        )
      });

      expect(next(state)).to.equal(Map({
        vote: Map({
          pair: List.of(
            'Trainspotting',
            '28 days later'
          )
        }),
        entries: List.of(
          'Sunshine'
        )
      }))
    })
  })

  describe('vote', () => {
    it('create tally for voted entry', () => {
      const state = Map({
          pair: List.of('Trainspotting', '28 days latter')
        });
      
      const nextState = Map({
          pair: List.of('Trainspotting', '28 days latter'),
          tally: Map({
            'Trainspotting': 1
          })
        });

      expect(vote(state, 'Trainspotting')).to.equal(nextState);
    })

    it('add to current tally for voted entry', () => {
      const state = Map({
          pair: List.of('Trainspotting', '28 days latter'),
          tally: Map({
            'Trainspotting': 3,
            '28 days latter': 2
          })
        });

      const nextState = vote(state, 'Trainspotting');

      expect(nextState).to.equal(
        Map({
          pair: List.of('Trainspotting', '28 days latter'),
          tally: Map({
            'Trainspotting': 4,
            '28 days latter': 2
          })
        })
      );
    })

    it('put winner of current vote back to entries', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Trainspotting', '28 days later'),
          tally: Map({
            'Trainspotting': 4,
            '28 days later': 3
          })
        }),
        entries: List.of('Millionare', 'Sunshine', '127 hours')
      })
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Millionare', 'Sunshine')
        }),
        entries: List.of('127 hours', 'Trainspotting')
      }))
    })

    it('add both voting entries back to entries in case of tie', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Trainspotting', '28 days later'),
          tally: Map({
            'Trainspotting': 3,
            '28 days later': 3
          })
        }),
        entries: List.of('Millionare', 'Sunshine', '127 hours')
      })
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Millionare', 'Sunshine')
        }),
        entries: List.of('127 hours', 'Trainspotting', '28 days later')
      }))
    })

    it('set winner when just one entry lest', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Trainspotting', '28 days later'),
          tally: Map({
            'Trainspotting': 4,
            '28 days later': 3
          })
        }),
        entries: List()
      })
      const nextState = next(state);

      expect(nextState).to.equal(Map({
        winner: 'Trainspotting'
      }))
    })
  });
})
