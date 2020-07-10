export default /* glsl */`
#ifdef USE_SEGMENTATION_MAP

	attribute uint segmentIndex;

	uniform sampler2D segmentationMap;
	uniform uint segmentationSize;
	
	mat4 getSegmentationMatrix( uint i ) {

		uint L = segmentationSize;
		float dL = 1.0 / ( 4.0 * float( segmentationSize ) - 1.0 );

		uint t = i / L ;
		uint s = ( i - ( t * L ) ) * uint(4);

		vec2 st0 = vec2( ( float(s) + 0.0 ) * dL, float(t) * dL );
		vec2 st1 = vec2( ( float(s) + 1.0 ) * dL, float(t) * dL );
		vec2 st2 = vec2( ( float(s) + 2.0 ) * dL, float(t) * dL );
		vec2 st3 = vec2( ( float(s) + 3.0 ) * dL, float(t) * dL );

		vec4 v0 = texture2D( segmentationMap, st0 );
		vec4 v1 = texture2D( segmentationMap, st1 );
		vec4 v2 = texture2D( segmentationMap, st2 );
		vec4 v3 = texture2D( segmentationMap, st3 );

		mat4 model = mat4( v0, v1, v2, v3 );

		return model;

	}

#endif

`;
