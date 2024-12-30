import { Maturity, type Position } from '../types/core';
import { smoothSoilMap } from '../utils/world';
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
    this.initSoilMap();
    this.generateEntity(1);
    this.generateResources(1000);
    setInterval(() => {
      this.generateResources(100);
      this.worldCleanUp();
    }, 30000);
  }

  generateResources(count: number): void {
    for (let i = 0; i < count; i++) {
      const position = this.randomPosition();
      const cellX = Math.floor(position.x / this.cellSize);
      const cellY = Math.floor(position.y / this.cellSize);

      const resource = new Resource(position, this.soilMap[cellX][cellY]);
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

  initSoilMap(): void {
    const cells = Math.ceil(this.size / this.cellSize);

    this.soilMap = Array.from({ length: cells }, () =>
      Array.from({ length: cells }, () => Math.random() * 100)
    );

    const iterations = 3;
    for (let iter = 0; iter < iterations; iter++) {
      this.soilMap = smoothSoilMap(this.soilMap);
    }
  }

  // TODO: need to implement normal decompose logic
  worldCleanUp(): void {
    this.resources = this.resources.filter(
      (el) => el.maturity !== Maturity.Overripe
    );
    this.entities = this.entities.filter((el) => el.isAlive);
  }
}

export default World;
