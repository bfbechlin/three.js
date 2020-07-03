export default /* glsl */`
vec3 objectNormal = vec3( normal );

#ifdef FLAT_SURFACE

	objectNormal = vec3(1, 0, 0);

#endif

#ifdef USE_TANGENT

	vec3 objectTangent = vec3( tangent.xyz );

	#ifdef FLAT_SURFACE

		objectTangent = vec3(0, 1, 0);

	#endif

#endif
`;
