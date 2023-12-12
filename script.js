// Function to test
// This is a placeholder for the knightMoves function you will implement

function getResultPath(childToParent, cur) {
  const res = [];
  while (cur !== null) {
    res.unshift(cur);
    cur = childToParent[cur];
  }
  return res;
}

function knightMoves(start, end) {
  // Implement your knightMoves function here
  const SIZE = 8;
  const visited = new Set();
  const childToParent = {};

  if (
    start[0] < 0 ||
    start[0] >= SIZE ||
    start[1] < 0 ||
    start[1] >= SIZE ||
    end[0] < 0 ||
    end[0] >= SIZE ||
    end[1] < 0 ||
    end[1] >= SIZE
  ) {
    return null;
  }

  visited.add(start[0] + ',' + start[1]);
  childToParent[start[0] + ',' + start[1]] = null;
  const queue = [start];

  let depth = 1;
  const dirs = [-2, -1, 1, 2];

  while (queue.length > 0) {
    const n = queue.length;
    for (let i = 0; i < n; i++) {
      const cur = queue.shift();
      const [r, c] = cur;
      if (r === end[0] && c === end[1]) {
        return getResultPath(childToParent, cur);
      }
      for (const d1 of dirs) {
        for (const d2 of dirs) {
          if (Math.abs(d1) !== Math.abs(d2)) {
            const rr = r + d1,
              cc = c + d2;
            const str = rr + ',' + cc;
            if (
              !visited.has(str) &&
              rr >= 0 &&
              rr < SIZE &&
              cc >= 0 &&
              cc < SIZE
            ) {
              visited.add(str);
              queue.push([rr, cc]);
              childToParent[rr + ',' + cc] = cur;
            }
          }
        }
      }
    }
    depth++;
  }

  return; // Placeholder return
}

// Test cases

// Test basic moves
console.log(
  knightMoves([0, 0], [1, 2]).toString() ===
    [
      [0, 0],
      [1, 2]
    ].toString()
);
console.log(
  knightMoves([0, 0], [2, 1]).toString() ===
    [
      [0, 0],
      [2, 1]
    ].toString()
);

// Test multiple shortest paths
const result1 = knightMoves([0, 0], [3, 3]);
console.log(
  result1.toString() ===
    [
      [0, 0],
      [2, 1],
      [3, 3]
    ].toString() ||
    result1.toString() ===
      [
        [0, 0],
        [1, 2],
        [3, 3]
      ].toString()
);

const result2 = knightMoves([3, 3], [0, 0]);
console.log(
  result2.toString() ===
    [
      [3, 3],
      [2, 1],
      [0, 0]
    ].toString() ||
    result2.toString() ===
      [
        [3, 3],
        [1, 2],
        [0, 0]
      ].toString()
);

// Test longer paths
const result3 = knightMoves([0, 0], [7, 7]);
const validPaths3 = [
  [
    [0, 0],
    [2, 1],
    [4, 2],
    [6, 3],
    [4, 4],
    [6, 5],
    [7, 7]
  ],
  [
    [0, 0],
    [2, 1],
    [4, 2],
    [6, 3],
    [7, 5],
    [5, 6],
    [7, 7]
  ],
  [
    [0, 0],
    [1, 2],
    [0, 4],
    [1, 6],
    [3, 5],
    [5, 6],
    [7, 7]
  ]
];
console.log(validPaths3.some(path => path.toString() === result3.toString()));

// Test for a more complex move
const result4 = knightMoves([3, 3], [4, 3]);
console.log(
  result4.length === 4 &&
    result4[0].toString() === [3, 3].toString() &&
    result4[3].toString() === [4, 3].toString()
);

// Test invalid inputs
console.log(knightMoves([8, 8], [0, 0]) === null); // Outside the board
console.log(knightMoves([-1, -1], [0, 0]) === null); // Negative coordinates
console.log(knightMoves([0, 0], [0, 0]).toString() === [[0, 0]].toString()); // Same start and end

// Test path does not go off the board
const offBoardCheck = path =>
  path.every(([x, y]) => x >= 0 && x < 8 && y >= 0 && y < 8);
console.log(offBoardCheck(knightMoves([0, 0], [7, 7])));
console.log(offBoardCheck(knightMoves([1, 2], [4, 5])));
