export function database() {
    return {
        //mongodb: 'mongodb+srv://tree:LifeTreeV2@dblifetree.pn1er.gcp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
        mongodb: `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_Password}@dblifetree-pn1er.gcp.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`
    }
}