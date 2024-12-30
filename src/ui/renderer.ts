import * as d3 from 'd3';
import type AbstractWorld from '../core/abstracts/abstractWorld';
import { maturityColors, vegetableSize } from '../constants';

class Renderer {
  private svg: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>;

  constructor(containerId: string, size: number) {
    this.svg = d3
      .select(`#${containerId}`)
      .append('svg')
      .attr('width', size)
      .attr('height', size);
  }

  render(world: AbstractWorld): void {
    const scale = d3.scaleLinear().domain([0, world.size]).range([0, 500]); // Scale to fit within 500x500 px canvas

    const soilColorScale = d3
      .scaleLinear<string, number>()
      .domain([0, 100])
      .range(['#f4e7c3', '#8b4513']); // Corrected by removing extra dot
    const cellSize = world.cellSize;

    // Clear previous frame
    this.svg.selectAll('*').remove();

    // Render soil
    this.svg
      .selectAll('rect.soil')
      .data(
        world.soilMap.flatMap((row, i) =>
          row.map((fertilizer, j) => ({ fertilizer, x: i, y: j }))
        )
      )
      .enter()
      .append('rect')
      .attr('class', 'soil')
      .attr('x', (d) => scale(d.x * cellSize))
      .attr('y', (d) => scale(d.y * cellSize))
      .attr('width', scale(cellSize) - scale(0)) // Scale the cell size
      .attr('height', scale(cellSize) - scale(0)) // Scale the cell size
      .attr('fill', (d) => soilColorScale(d.fertilizer));

    // Render resources
    this.svg
      .selectAll('circle.resource')
      .data(world.resources)
      .enter()
      .append('circle')
      .attr('class', 'resource')
      .attr('cx', (d) => scale(d.position.x))
      .attr('cy', (d) => scale(d.position.y))
      .attr('r', (d) => vegetableSize[d.maturity])
      .attr('fill', (d) => maturityColors[d.maturity]);

    // Render entities
    // Render entities
    this.svg
      .selectAll('g.entity')
      .data(world.entities)
      .join(
        (enter) => {
          const entityGroup = enter
            .append('g')
            .attr('class', 'entity')
            .attr(
              'transform',
              (d) => `translate(${scale(d.position.x)}, ${scale(d.position.y)})`
            );

          // Add the white body (main circle)
          entityGroup
            .append('circle')
            .attr('class', 'entity-body')
            .attr('r', 10)
            .attr('fill', (d) => (d.isAlive ? 'white' : 'gray'))
            .attr('stroke', 'black')
            .attr('stroke-width', 1);

          // Add black spots
          entityGroup
            .append('circle')
            .attr('class', 'entity-spot')
            .attr('cx', -3) // Adjust position for the first spot
            .attr('cy', -3)
            .attr('r', 3)
            .attr('fill', (d) => (d.isAlive ? 'black' : 'none')); // No spots for dead

          entityGroup
            .append('circle')
            .attr('class', 'entity-spot')
            .attr('cx', 4) // Adjust position for the second spot
            .attr('cy', 2)
            .attr('r', 3)
            .attr('fill', (d) => (d.isAlive ? 'black' : 'none')); // No spots for dead

          return entityGroup;
        },
        (update) =>
          update.attr(
            'transform',
            (d) => `translate(${scale(d.position.x)}, ${scale(d.position.y)})`
          )
      );
  }
}

export default Renderer;
