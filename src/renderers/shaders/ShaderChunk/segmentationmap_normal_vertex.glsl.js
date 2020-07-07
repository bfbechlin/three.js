export default /* glsl */`
#ifdef USE_SEGMENTATION_MAP

	mat4 segment_model = inverse(tranpose(getSegmentationMatrix(segmentIndex)));

	objectNormal = vec3( segment_model * vec4( objectNormal, 0.0 ) );

	#ifdef USE_TANGENT

		objectTangent = vec3( segment_model * vec4( objectTangent, 0.0 ) );

	#endif
#endif
`;
