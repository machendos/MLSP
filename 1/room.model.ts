import { DFS } from './DFS';
import { Furniture } from './furniture';
import { RoomState } from './room.state';

const initialState = new RoomState([
  Furniture.Table,
  Furniture.Chair,
  Furniture.Cabinet,
  Furniture.Chair,
  null,
  Furniture.Armchair,
]);

const goalState = new RoomState([
  Furniture.Table,
  Furniture.Chair,
  Furniture.Armchair,
  Furniture.Chair,
  null,
  Furniture.Cabinet,
]);

new DFS(initialState, goalState).findPath().map(roomState => {
  const data = roomState.getData();
  console.log('\n========');
  console.log(data.slice(0, 3));
  console.log(data.slice(3));
  console.log('========\n');
});
