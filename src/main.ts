import World from './core/world';
import Renderer from './ui/renderer';
import SimulationEngine from './core/engine';

export const WORLD_SIZE = 100;
export const INTERVAL = 100;

const world = new World(WORLD_SIZE);

const renderer = new Renderer('simulation-container', 500);

const engine = new SimulationEngine(world, renderer, INTERVAL);

engine.start();

document
  .getElementById('pause-button')
  ?.addEventListener('click', () => engine.stop());
document
  .getElementById('start-button')
  ?.addEventListener('click', () => engine.start());
document
  .getElementById('restart-button')
  ?.addEventListener('click', () => engine.restart());
