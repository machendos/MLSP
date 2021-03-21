import { State } from './room.state';

export class DFS {
  queue: Array<State> = [];
  reached: Array<State> = [];
  path: Array<State> = [];

  constructor(private initialState: State, private goalState: State) {}

  findPath() {
    this.queue.push(this.initialState);
    this.iteration();
    return this.path;
  }

  iteration() {
    if (this.queue.length) {
      const currState = this.queue.shift();
      this.reached.push(currState);
      if (this.goalState.equal(currState)) return currState;
      const childs = currState.getChilds();
      this.queue.unshift(
        ...childs.filter(child =>
          this.reached.every(testedState => !testedState.equal(child))
        )
      );
      const result = this.iteration();
      if (result) {
        this.path.unshift(result);
        return currState;
      } else return false;
    }
  }
}
