export default () => ({
    // variable de entorno PORT o por defecto el puerto 3000
    port: parseInt(process.env.PORT, 10) || 3000,
    mongodb: {
        password: process.env.DATABASE_PASSWORD,
        name: process.env.DATABASE_NAME,
        user: process.env.DATABASE_USER
    },
    cloudinary1:{
        cloud_name: process.env.CLOUDYNARY_NAME,
        cloud_api_key: process.env.CLOUDINARY_API_KEY,
        cloud_api_secret: process.env.CLOUDINARY_API_SECRET
    }
});

