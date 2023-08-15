import { HachureFiller } from './hachure-filler.js';
import { ResolvedOptions, OpSet } from '../core.js';
import { Point } from '../geometry.js';

export class HatchFiller extends HachureFiller {
  fillPolygons(polygonList: Point[][], o: ResolvedOptions): OpSet {
    const set = this._fillPolygons(polygonList, o);
    const o2 = Object.assign({}, o, { hachureAngle: o.hachureAngle + 90 });
    const set2 = this._fillPolygons(polygonList, o2);
    set.ops = set.ops.concat(set2.ops);
    return set;
  }
}