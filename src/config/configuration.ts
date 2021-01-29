export default () => ({
	PORT: process.env.PORT,
	ENVIRONMENT: process.env.ENVIRONMENT,
	TYPEORM: {
		HOST: process.env.TYPEORM_HOST,
		PORT: process.env.TYPEORM_PORT,
		DATABASE: process.env.TYPEORM_DATABASE,
		USERNAME: process.env.TYPEORM_USERNAME,
		PASSWORD: process.env.TYPEORM_PASSWORD,
	},
})
