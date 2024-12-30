import { growingDelay, vegetableFertilizerLevel } from '../constants';
import { Maturity, type Position } from '../types/core';
import { growVegetables } from '../utils/resource';
import AbstractResource from './abstracts/abstractResource';

class Resource extends AbstractResource {
  constructor(position: Position, fertilizerLevel: number, calories = 20) {
    super(position, calories, fertilizerLevel);
    this.fertilizerLevel = fertilizerLevel;
    this.growResource();
  }

  growResource() {
    const growing = growVegetables();

    const interval = setInterval(() => {
      const newState = growing.next().value as Maturity;

      if (this.fertilizerLevel < vegetableFertilizerLevel[newState]) {
        clearInterval(interval);
      }

      this.maturity = newState;

      if (this.maturity === Maturity.Mature) {
        clearInterval(interval);
      }
    }, growingDelay[this.maturity]);
  }

  reproduce(): void {}
}

export default Resource;
