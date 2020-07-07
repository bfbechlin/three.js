export default /* glsl */`
#ifdef USE_SEGMENTATION_MAP

	mat4 segmentation_modelMatrix = getSegmentationMatrix(segmentIndex);

	transformed = vec3( segmentation_modelMatrix * vec4( transformed, 1.0 ) );
	
#endif
`;
