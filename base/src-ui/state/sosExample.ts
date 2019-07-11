import { createSos } from './sos'

export interface IStateExample {
  count: number
}

let initialState: IStateExample = {
  count: 10,
}

const { stateManager, useSubscribe } = createSos(
  'sosExample',
  '1.0.0',
  initialState,
  {
    useLocalStorage: true,
  }
)
export { useSubscribe }

export async function adjustCount(adjustBy: number) {
  stateManager.produce((ds) => {
    ds.count += adjustBy
  })
}
