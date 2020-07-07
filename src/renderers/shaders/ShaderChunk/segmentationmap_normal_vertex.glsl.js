export default /* glsl */`
#ifdef USE_SEGMENTATION_MAP

	mat4 segmentation_normalMatrix = inverse(transpose(getSegmentationMatrix(segmentIndex)));

	objectNormal = vec3( segmentation_normalMatrix * vec4( objectNormal, 0.0 ) );

	#ifdef USE_TANGENT

		objectTangent = vec3( segmentation_normalMatrix * vec4( objectTangent, 0.0 ) );

	#endif
#endif
`;
