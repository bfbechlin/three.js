export default /* glsl */`
#ifdef USE_SEGMENTATION_MAP

	mat4 segment_model = getSegmentationMatrix(segmentIndex);

	transformed = vec3( segment_model * vec4( transformed, 1.0 ) );
	
#endif
`;
