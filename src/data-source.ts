import "reflect-metadata"
import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "123456",
    database: "portfolioglossary",
    synchronize: true,
    logging: false,
    entities: ["./src/entity/*.ts"],
    migrations: ["./src/migration/*.ts"],
    subscribers: [],
})

AppDataSource.initialize().then(() => {
    console.log("Database is connected")
}).catch((err) => {
    console.log("Database is not connected => ", err);
});
