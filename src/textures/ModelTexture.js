/**
 * @author alteredq / http://alteredqualia.com/
 */

import { Texture } from './Texture.js';
import { RGBAFormat, FloatType, UVMapping, ClampToEdgeWrapping, NearestFilter, LinearEncoding } from '../constants.js';
import { Float64BufferAttribute } from '../core/BufferAttribute';

function ModelTexture( lenght ) {

	Texture.call( this, null, UVMapping, ClampToEdgeWrapping, ClampToEdgeWrapping, NearestFilter, NearestFilter, RGBAFormat, FloatType, 1, LinearEncoding );

	var N = lenght ? Math.ceil( Math.log2( lenght ) / 2 ) : 1;
	this.image = { data: new Float64BufferAttribute( 16 * N * N, 4 ), width: N, height: 4 * N };
	this.N = N;

	this.generateMipmaps = false;
	this.flipY = false;
	this.unpackAlignment = 1;

	this.needsUpdate = true;

}

ModelTexture.prototype = Object.assign( Object.create( Texture.prototype ), {

	constructor: ModelTexture,

	isDataTexture: true,

	setMatrix: function ( index, mat ) {

		this.image.data.set( index, mat );

	},

	resize: function ( size ) {

		var N = Math.ceil( Math.log2( size ) / 2 );
		if ( N != this.N ) {

			var data = new Float64BufferAttribute( 16 * N * N );
			data.set( this.image.data, 0 );
			this.image = { data: data, width: N, height: 4 * N };
			this.N = N;
			this.needsUpdate = true;
			return true;

		}

		return false;

	}
} );



export { ModelTexture as DataTexture };
