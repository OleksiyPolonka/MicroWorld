import { v4 as uuidv4 } from 'uuid';

import AbstractEntity from './abstracts/abstractEntity';
import type AbstractWorld from './abstracts/abstractWorld';

import type { Position } from '../types/core';
import {
  MIN_ENERGY_FOR_REPRODUCE,
  SIMPLE_CONSUME_DELAY,
  SIMPLE_REPRODUCE_DELAY,
  STEP_SIZE,
} from '../constants';
import {
  actionDelay,
  decideDirection,
  directionTowards,
  findNearestResource,
  hasEnoughEnergyForReproduce,
  isValidMove,
} from '../utils/entity';

class Entity extends AbstractEntity {
  constructor(position: Position, energy = 100, health = 100) {
    super(uuidv4(), position, energy, health);
  }

  move(world: AbstractWorld): void {
    const spentEnergy = 1;

    if (this.energy - spentEnergy >= 0) {
      this.energy -= spentEnergy;

      let nearestResource = findNearestResource(this.position, world.resources);
      let direction = '';

      if (nearestResource) {
        direction = directionTowards(this.position, nearestResource);
      } else {
        direction = decideDirection();
      }

      let newX = this.position.x;
      let newY = this.position.y;

      switch (direction) {
        case 'up':
          newY -= STEP_SIZE;
          break;
        case 'down':
          newY += STEP_SIZE;
          break;
        case 'left':
          newX -= STEP_SIZE;
          break;
        case 'right':
          newX += STEP_SIZE;
          break;
        case 'up-left':
          newX -= STEP_SIZE;
          newY -= STEP_SIZE;
          break;
        case 'up-right':
          newX += STEP_SIZE;
          newY -= STEP_SIZE;
          break;
        case 'down-left':
          newX -= STEP_SIZE;
          newY += STEP_SIZE;
          break;
        case 'down-right':
          newX += STEP_SIZE;
          newY += STEP_SIZE;
          break;

        default:
          newX = this.position.x;
          newY = this.position.y;
      }

      if (isValidMove(newX, newY)) {
        this.position = { x: newX, y: newY };
      }

      if (nearestResource) {
        this.consume(world);
      }
    } else {
      this.eliminate();
    }
  }

  eliminate(): void {
    this.energy = 0;
    this.health = 0;
    this.isAlive = false;
  }

  async consume(world: AbstractWorld): Promise<void> {
    const idx = world.resources.findIndex(
      ({ position }) =>
        position.x === this.position.x && position.y === this.position.y
    );
    if (idx >= 0 && world.resources[idx] != null) {
      world.resources.splice(idx, 1);
      await actionDelay(this, SIMPLE_CONSUME_DELAY);

      let energyGain = world.resources[idx].calories * this.metabolismRate;
      this.energy += Math.floor(energyGain);
    }
  }

  async decisionMaker(world: AbstractWorld): Promise<void> {
    // Can be extended in the future to interrupt process
    if (this.isBusy) {
      return;
    }

    if (this.energy === 0) {
      this.eliminate();

      return;
    }

    if (hasEnoughEnergyForReproduce(this.energy)) {
      const newEntity = await this.reproduce();

      if (newEntity != null) {
        world.entities.push(newEntity);
      }
    }

    this.move(world);
  }

  async reproduce(): Promise<Entity | null> {
    if (this.energy > MIN_ENERGY_FOR_REPRODUCE) {
      this.energy -= MIN_ENERGY_FOR_REPRODUCE; // TODO: Need to decrease energy energy gradually

      await actionDelay(this, SIMPLE_REPRODUCE_DELAY);

      return new Entity(this.position);
    }
    return null;
  }
}

export default Entity;
