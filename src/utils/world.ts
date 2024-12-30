export const smoothSoilMap = (soilMap: number[][]): number[][] => {
  const cells = soilMap.length;
  const newSoilMap = Array.from({ length: cells }, () => Array(cells).fill(0));

  for (let x = 0; x < cells; x++) {
    for (let y = 0; y < cells; y++) {
      const neighbors = getNeighbors(soilMap, x, y);
      const total = neighbors.reduce((sum, value) => sum + value, 0);
      newSoilMap[x][y] = total / neighbors.length;
    }
  }

  return newSoilMap;
};

export const getNeighbors = (
  soilMap: number[][],
  x: number,
  y: number
): number[] => {
  const neighbors = [];
  const cells = soilMap.length;

  for (let dx = -1; dx <= 1; dx++) {
    for (let dy = -1; dy <= 1; dy++) {
      const nx = x + dx;
      const ny = y + dy;

      if (nx >= 0 && nx < cells && ny >= 0 && ny < cells) {
        neighbors.push(soilMap[nx][ny]);
      }
    }
  }

  return neighbors;
};
