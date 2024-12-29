import type { Position } from '../types/core';
import AbstractWorld from './abstracts/abstractWorld';

import Entity from './entity';
import Resource from './resource';

class World extends AbstractWorld {
  constructor(size: number) {
    super(size);

    this.initWorld();
  }

  initWorld(): void {
    this.entities = [];
    this.resources = [];
    this.generateEntity(15);
    this.generateResources(100);
  }

  generateResources(count: number): void {
    for (let i = 0; i < count; i++) {
      const resource = new Resource(this.randomPosition());
      this.resources.push(resource);
    }
  }

  generateEntity(count: number): void {
    for (let i = 0; i < count; i++) {
      const position = this.randomPosition();
      const entity = new Entity(position, 100, 100);

      this.entities.push(entity);
    }
  }

  randomPosition(): Position {
    return {
      x: Math.floor(Math.random() * this.size),
      y: Math.floor(Math.random() * this.size),
    };
  }

  update(): void {
    this.entities.map((entity) => {
      return entity.decisionMaker(this);
    });
  }
}

export default World;
