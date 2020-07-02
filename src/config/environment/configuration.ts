export default () => ({
    // variable de entorno PORT o por defecto el puerto 3000
    port: parseInt(process.env.PORT, 10) || 3000,
    mongodb: {
        password: process.env.DATABASE_PASSWORD,
        name: process.env.DATABASE_NAME,
        user: process.env.DATABASE_USER
    },
});

//comentario 2
