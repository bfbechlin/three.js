/**
 * @author bfbechlin
 */

import { Mesh } from './Mesh.js';
import { Matrix4 } from '../math/Matrix4';
import { MathUtils } from '../math/MathUtils';
import { RGBAFormat, FloatType } from '../constants.js';
import { DataTexture } from '../textures/DataTexture';

var _identity = new Matrix4();

function createTexture( size ) {

	size = MathUtils.ceilPowerOfFour( size );
	var length = 4 * size * size;
	var data = new Float32Array( length );

	// Filling up segments with identity matrix
	for ( var i = 0; i < length; i += 16 ) {

		data.set( _identity.elements, i );

	}

	return new DataTexture( data, size, size, RGBAFormat, FloatType );

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

	this.segmentation = createTexture( size || 4 );

}

SegmentedMesh.prototype = Object.assign( Object.create( Mesh.prototype ), {

	constructor: SegmentedMesh,

	isSegmentedMesh: true,

	setSegment: function ( index, matrix ) {

		var texture = this.segmentation.image;
		if ( index >= texture.width ) {

			return false;

		}

		texture.data.set( matrix.elements, index * 16 );
		this.segmentation.needsUpdate = true;
		return true;

	},

	resizeSegmentation: function ( size ) {

		size = MathUtils.ceilPowerOfFour( size );
		var texture = this.segmentation.image;

		if ( size != texture.width ) {

			this.segmentation = createTexture( size );
			this.segmentation.image.data.set( texture.data );


		}

	},

	copy: function ( source ) {

		Mesh.prototype.copy.call( this, source );

		return this;

	},
} );


export { SegmentedMesh };
