/**
 * @author bfbechlin
 */

import { Mesh } from './Mesh.js';
import { Matrix4 } from '../math/Matrix4';
import { RGBAFormat, FloatType } from '../constants.js';
import { DataTexture } from '../textures/DataTexture';

var _identity = new Matrix4();

function createTexture( N ) {

	var side = Math.pow( 2, N + 1 );
	var length = 4 * side * side;
	var data = new Float32Array( length );

	// Filling up segments with identity matrix
	for ( var i = 0; i < length; i += 16 ) {

		data.set( _identity.elements, i );

	}

	return new DataTexture( data, side, side, RGBAFormat, FloatType );

}

function SegmentedMesh( geometry, material, size ) {

	if ( geometry && geometry.isGeometry ) {

		console.error( 'THREE.SegmentedMesh does not supports THREE.Geometry. Use THREE.BufferGeometry instead.' );

	}

	if ( geometry && geometry.isBufferGeometry && ! geometry.getAttribute( 'segmentIndex' ) ) {

		console.error( 'THREE.SegmentedMesh requires \'segmentIndex\' attribute in its THREE.BufferGeometry.' );

	}

	Mesh.call( this, geometry, material );

	this.type = 'SegmentedMesh';

	size = !size || size < 2 ? 2 : size;
	
	var N = Math.ceil( Math.log2( size ) / 2 );
	
	this.segmentation = {
		N: N,
		L: Math.pow( 2, N - 1 ),
		C: Math.pow( 4, N ),
		texture: createTexture( N )
	}

}

SegmentedMesh.prototype = Object.assign( Object.create( Mesh.prototype ), {

	constructor: SegmentedMesh,

	isSegmentedMesh: true,

	setSegment: function ( index, matrix ) {

		if ( index >= this.segmentation.C ) {

			return false;

		}

		var texture = this.segmentation.texture;
		texture.image.data.set( matrix.elements, index * 16 );
		texture.needsUpdate = true;

		return true;

	},

	resizeSegmentation: function ( size ) {

		var N = Math.ceil( Math.log2( size ) / 2 );

		if ( N != this.segmentation.N ) {

			var data = this.segmentation.texture.image.data;
			this.segmentation = {
				N: N,
				L: Math.pow( 2, N - 1 ),
				C: Math.pow( 4, N  ),
				texture: createTexture( N )
			};
			this.segmentation.texture.image.data.set( data );

		}
	
	},

	raycast: function ( raycaster, intersects ) {

		console.warn( 'THREE.SegmentedMesh does not implement raycasting correctly. Please see the docs for more info.' );

		return Mesh.prototype.raycast.call( this, raycaster, intersects );
		
	},

	copy: function ( source ) {

		Mesh.prototype.copy.call( this, source );

		return this;

	},

} );


export { SegmentedMesh };
