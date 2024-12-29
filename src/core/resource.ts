import { v4 as uuidv4 } from 'uuid';

import type { Position } from '../types/core';
import AbstractResource from './abstracts/abstractResource';

class Resource extends AbstractResource {
  constructor(position: Position, calories = 20) {
    super(uuidv4(), position, calories);
  }
}

export default Resource;
