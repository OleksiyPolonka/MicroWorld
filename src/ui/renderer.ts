import * as d3 from 'd3';
import type AbstractWorld from '../core/abstracts/abstractWorld';

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

    // Clear previous frame
    this.svg.selectAll('*').remove();

    // Render resources
    this.svg
      .selectAll('circle.resource')
      .data(world.resources)
      .enter()
      .append('circle')
      .attr('class', 'resource')
      .attr('cx', (d) => scale(d.position.x))
      .attr('cy', (d) => scale(d.position.y))
      .attr('r', 5)
      .attr('fill', 'green');

    // Render entities
    this.svg
      .selectAll('circle.entity')
      .data(world.entities)
      .enter()
      .append('circle')
      .attr('class', 'entity')
      .attr('cx', (d) => scale(d.position.x))
      .attr('cy', (d) => scale(d.position.y))
      .attr('r', 10)
      .attr('fill', (d) => (d.isAlive ? 'blue' : 'red'));
  }
}

export default Renderer;
