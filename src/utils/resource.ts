import { Maturity } from '../types/core';

export function* growVegetables() {
  yield Maturity.Seed;
  yield Maturity.Sprout;
  yield Maturity.Growing;
  yield Maturity.Mature;
  // yield Maturity.Overripe;
}
