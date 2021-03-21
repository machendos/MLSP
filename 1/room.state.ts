import { Furniture } from './furniture';

export abstract class State {
  abstract getChilds(): Array<State>;
  abstract equal(state: State): boolean;
  abstract getData(): any;
}

export class RoomState implements State {
  constructor(private furniture: Array<Furniture | null>) {}

  swap(index1, index2): Array<Furniture | null> {
    const copy = this.furniture.slice();
    [copy[index1], copy[index2]] = [
      this.furniture[index2],
      this.furniture[index1],
    ];
    return copy;
  }

  getChilds(): Array<RoomState> {
    const emptyIndex = this.furniture.findIndex(
      furniture => furniture === null
    );
    const columnNeiborhoodIndex = (emptyIndex + 2) % 5;
    const leftNeiborhoodIndex =
      emptyIndex === 0
        ? 2
        : Math.floor(emptyIndex / 3) * 3 + ((emptyIndex - 1) % 3);
    const rigntNeiborhoodIndex =
      Math.floor(emptyIndex / 3) * 3 + ((emptyIndex + 1) % 3);

    return [
      new RoomState(this.swap(emptyIndex, columnNeiborhoodIndex)),
      new RoomState(this.swap(emptyIndex, leftNeiborhoodIndex)),
      new RoomState(this.swap(emptyIndex, rigntNeiborhoodIndex)),
    ];
  }

  equal(roomState: RoomState) {
    return this.furniture.every(
      (furniture, index) => roomState.furniture[index] === furniture
    );
  }

  getData() {
    return this.furniture;
  }
}
