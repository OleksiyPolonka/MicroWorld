import World from './world';
import Renderer from '../ui/renderer';

class SimulationEngine {
  private world: World;
  private renderer: Renderer;
  private running: boolean;
  private interval: number;

  constructor(world: World, renderer: Renderer, interval = 1000) {
    this.world = world;
    this.renderer = renderer;
    this.running = false;
    this.interval = interval;
  }

  start(): void {
    if (this.running) return;
    this.running = true;
    this.runLoop();
  }

  stop(): void {
    this.running = false;
  }

  private runLoop(): void {
    if (!this.running) return;

    this.world.update(); // Update world state
    this.renderer.render(this.world); // Render the world

    setTimeout(() => this.runLoop(), this.interval);
  }

  restart(): void {
    this.running = false;
    this.world.initWorld();
    this.start();
  }
}

export default SimulationEngine;
