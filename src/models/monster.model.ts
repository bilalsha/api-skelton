import { Id, Model, RelationMappings } from 'objection';
import Base from './base';

export class Monster extends Base {
  id!: Id;
  name!: string;
  attack!: number;
  defense!: number;
  hp!: number;
  speed!: number;
  imageUrl!: string;

  static tableName = 'monster';

  static get relationMappings(): RelationMappings {
    return {};
  }
}
