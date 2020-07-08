import { Geometry } from '../core/Geometry';
import { Material } from '../materials/Material';
import { Raycaster } from '../core/Raycaster';
import { Object3D } from '../core/Object3D';
import { BufferGeometry } from '../core/BufferGeometry';
import { DataTexture } from '../textures/DataTexture';
import { Intersection } from '../core/Raycaster';

export class Mesh <
	TGeometry extends Geometry | BufferGeometry = Geometry | BufferGeometry,
	TMaterial extends Material | Material[] = Material | Material[]
> extends Object3D {

	constructor(
		geometry?: TGeometry,
		material?: TMaterial,
		size?: number,
	);

	geometry: TGeometry;
	material: TMaterial;
	morphTargetInfluences?: number[];
	morphTargetDictionary?: { [key: string]: number };
	readonly isMesh: true;
	readonly isSegmentedMesh: true;
	segmentation: DataTexture;
	type: string;

	updateMorphTargets(): void;
	raycast( raycaster: Raycaster, intersects: Intersection[] ): void;

}
