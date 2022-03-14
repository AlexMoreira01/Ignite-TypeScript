import { hash } from "bcryptjs";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuid } from "uuid";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";

let connection: Connection;
describe("should be able to create a new category", async () => {
    beforeEach(async () => {
        connection = await createConnection();

        const id = uuid();
        const password = await hash("admin", 8);

        // Inserção manualmente
        await connection.query(
            `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
            values('${id}', 'admin', 'admin@rentx.com.br','${password}', true, 'now()', 'XXXXXX')
        `
        );
    });

    it("test", async () => {
        const response = await request(app).post("/categories").send({
            name: "Category Supertest",
            description: "Category Supertest",
        });

        expect(response.status).toBe(201);
    });
});
