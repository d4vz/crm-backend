import App from "@/app";
import { SignUpDto } from "@/dtos/auth.dto";
import { UserModel } from "@/models/user.model";
import { AuthRoute } from "@/routes/auth.route";
import { UserRoute } from "@/routes/users.route";
import { testUser } from "@/test/utils";
import { randomUUID } from "crypto";
import mongoose from "mongoose";
import request from "supertest";

const user: SignUpDto = {
  name: randomUUID(),
  email: randomUUID() + "@gmail.com",
  password: randomUUID(),
};

describe("AuthController (e2e)", () => {
  let app: App;
  let createdUserId: string;

  beforeAll(async () => {
    app = new App([new AuthRoute(), new UserRoute()]);
  });

  afterAll(async () => {
    await UserModel.deleteOne({ _id: createdUserId });
    await mongoose.disconnect();
  });

  describe("(POST) /signup - SignUp", () => {
    it("deve retornar 201 ao criar um novo usuário", async () => {
      const signupResponse = await request(app.getServer()).post("/auth/signup").send(user).expect(201);
      createdUserId = signupResponse.body._id;
    });

    it("deve retornar 409 ao tentar criar um usuário com um email já existente", async () => {
      await request(app.getServer()).post("/auth/signup").send(user).expect(409);
    });
  });

  describe("(POST) /login - Login", () => {
    it("deve retornar 200 ao fazer login", async () => {
      await request(app.getServer()).post("/auth/login").send({ email: user.email, password: user.password }).expect(200);
    });

    it("deve retornar 401 ao fazer login com uma senha incorreta", async () => {
      await request(app.getServer()).post("/auth/login").send({ email: user.email, password: "wrongpassword" }).expect(401);
    });

    it("deve retornar 404 ao fazer login com um email que não existe", async () => {
      await request(app.getServer()).post("/auth/login").send({ email: "wrongemail@gmail.com", password: user.password }).expect(404);
    });

    describe("(GET) /me - Me", () => {
      it("deve retornar 200 ao buscar o usuário logado", async () => {
        const loginResponse = await request(app.getServer()).post("/auth/login").send({ email: testUser.email, password: testUser.password });
        const token = loginResponse.body.token;
        const response = await request(app.getServer()).get("/auth/me").set("Authorization", `Bearer ${token}`).expect(200);
        expect(response.body).toHaveProperty("_id");
      });
    });
  });
});
