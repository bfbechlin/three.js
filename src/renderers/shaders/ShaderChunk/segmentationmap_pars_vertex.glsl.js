export default /* glsl */`
#ifdef USE_SEGMENTATION_MAP

	attribute int segmentIndex;

	uniform sampler2D segmentationMap;
	uniform int segmentationSize;
	
	mat4 getSegmentationMatrix( int i ) {

		int L4 = segmentationSize / 4;
		float dL = 1.0 / ( float( segmentationSize ) - 1.0 );

		int y = i / L4 ;
		int x = i - ( y * L4 );

		vec2 st1 = vec2( float(x)* dL, float(y) * dL);
		vec2 st2 = vec2( st1.x + dL, st1.y);
		vec2 st3 = vec2( st2.x + dL, st2.y);
		vec2 st4 = vec2( st3.x + dL, st3.y);

		vec4 v1 = texture2D( segmentationMap, st1 );
		vec4 v2 = texture2D( segmentationMap, st2 );
		vec4 v3 = texture2D( segmentationMap, st3 );
		vec4 v4 = texture2D( segmentationMap, st4 );

		mat4 model = mat4( v1, v2, v3, v4 );

		return model;

	}

#endif

`;
