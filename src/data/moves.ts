const A00 = [1, 1, 0, 1, 0, 0, 0, 0];
const A01 = [1, 1, 1, 0, 0, 0, 0, 0];
const A02 = [0, 1, 1, 0, 1, 0, 0, 0];
const A10 = [1, 0, 0, 1, 0, 1, 0, 0];
const A12 = [0, 0, 1, 0, 1, 0, 0, 1];
const A20 = [0, 0, 0, 1, 0, 1, 1, 0];
const A21 = [0, 0, 0, 0, 0, 1, 1, 1];
const A23 = [0, 0, 0, 0, 1, 0, 1, 1];

const moves = [A00, A01, A02, A10, A12, A20, A21, A23];
export function addArrays(a: number[], b: number[]) {
  if (a.length !== b.length) {
    throw new Error("Arrays must be the same length");
  }
  const newGrid = a.map((v, i) => (v + b[i]) % 2);
  console.log("newGrid", newGrid);
  return newGrid;
}

export const handleMove = (index: number, grid: number[]) => {
  console.log("handleMove", index, grid);
  return addArrays(grid, moves[index]);
};
