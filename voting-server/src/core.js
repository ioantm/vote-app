import { List, Map } from 'immutable'

export function setEntries(state, entries) {
  return state.set('entries', List(entries));
}

export function next(state) {
  const entries = state.get('entries');

  return state.merge(Map({
    vote: Map({
      pair: entries.take(2),
    }),
    entries: entries.skip(2)
  }))
}

export function vote(state, votedItem) {
  const tally = state.get('pair').get('tally');
  
  return state.merge(Map({
    vote: Map({
      tally: tally.merge(Map({
        votedItem: tally.get(votedItem)
      }))
    })
  }))
}
