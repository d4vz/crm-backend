import App from "@/app";
import { CreateUserDto, UpdateUserDto } from "@/dtos/users.dto";
import { UserRoute } from "@/routes/users.route";
import { AuthRoute } from "@routes/auth.route";

import mongoose from "mongoose";
import { SuperAgentTest } from "supertest";
import { authAgent } from "../../utils";

describe("UserController (e2e)", () => {
  let app: App;
  let userId: string;
  let agent: SuperAgentTest;

  beforeAll(async () => {
    app = new App([new AuthRoute(), new UserRoute()]);
    agent = await authAgent(app.getServer());
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe("(POST) /users - createUser", () => {
    const userData: CreateUserDto = {
      name: "aleatorio",
      email: "aleatorio@gmail.com",
      password: "senhacom9digitos",
      company: "6603535000a99c3edd3c156f",
    };

    it("deve criar um usuário com status 201", async () => {
      await agent
        .post("/users")
        .send(userData)
        .expect(201)
        .then(response => {
          userId = response.body._id;
        });
    });

    it("deve retornar 409 se o usuário já existir", async () => {
      await agent.post("/users").send(userData).set("Content-Type", "application/json").expect(409);
    });

    it("deve retornar 400 se o email for inválido", async () => {
      const invalidEmailData: CreateUserDto = {
        name: "aleatorio",
        email: "emailinvalido",
        password: "senhacom9digitos",
        company: "6603535000a99c3edd3c156f",
      };

      await agent.post("/users").send(invalidEmailData).set("Content-Type", "application/json").expect(400);
    });

    it("Deve retornar 400 se o usuário não tiver a empresa", async () => {
      const invalidCompanyData: CreateUserDto = {
        name: "aleatorio",
        email: "emailinvalido",
        password: "senhacom9digitos",
        company: "aleatorio",
      };

      await agent.post("/users").send(invalidCompanyData).set("Content-Type", "application/json").expect(400);
    });
  });

  describe("(GET) /users - getUsers", () => {
    it("deve retornar uma lista de usuários com status 200", async () => {
      await agent
        .get("/users")
        .expect(200)
        .then(response => {
          expect(response.body).toBeInstanceOf(Array);
          expect(response.body.length).toBeGreaterThan(0);
        });
    });
  });

  describe("(GET) /users/:id - getUserById", () => {
    it("deve retornar um usuário com status 200", async () => {
      await agent
        .get(`/users/${userId}`)
        .expect(200)
        .then(response => {
          expect(response.body._id).toBe(userId);
        });
    });
  });

  describe("(PUT) /users/:id - updateUser", () => {
    const userData: UpdateUserDto = {
      email: "email2@gmail.com",
      password: "senhacom9digitos",
    };

    it("deve atualizar um usuário com status 200", async () => {
      await agent.put(`/users/${userId}`).send(userData).set("Content-Type", "application/json").expect(200);
    });
  });

  describe("(DELETE) /users/:id - deleteUser", () => {
    it("deve deletar um usuário com status 200", async () => {
      await agent
        .delete(`/users/${userId}`)
        .expect(200)
        .then(response => {
          expect(response.body._id).toBe(userId);
        });
    });
  });
});
