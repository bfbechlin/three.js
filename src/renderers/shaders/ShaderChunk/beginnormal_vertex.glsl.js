export default /* glsl */`
#ifdef FLAT_SURFACE

	vec3 objectNormal = vec3( 0.0, 0.0, 1.0 );

#else

	vec3 objectNormal = vec3( normal );

#endif

#ifdef USE_TANGENT

	#ifdef FLAT_SURFACE

		vec3 objectTangent = vec3( 1.0, 0.0, 0.0 );

	#else
	
		vec3 objectTangent = vec3( tangent.xyz );

	#endif

#endif
`;
