import App from "@/app";
import { CreateCompanyDto, UpdateCompanyDto } from "@/application/dtos/company.dto";
import { AuthRoute } from "@/application/routes/auth.route";
import { CompaniesRoute } from "@/application/routes/companies.route";
import { authAgent } from "@/test/utils";
import mongoose from "mongoose";
import { SuperAgentTest } from "supertest";

describe("LeadsController (e2e)", () => {
  let createdCompanyId: string;
  let app: App;
  let agent: SuperAgentTest;

  beforeAll(async () => {
    app = new App([new AuthRoute(), new CompaniesRoute()]);
    agent = await authAgent(app.getServer());
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  describe("POST /companies", () => {
    it("should create a company", async () => {
      const createCompanyDto: CreateCompanyDto = {
        name: "Empresa de Teste",
        address: "123 Main St",
        email: "jhoendoe@gmail.com",
        phone: "123-456-7890",
      };

      await agent
        .post("/companies")
        .send(createCompanyDto)
        .expect(201)
        .then(res => {
          expect(res.body).toHaveProperty("_id");
          createdCompanyId = res.body._id;
        });
    });
  });

  describe("GET /companies", () => {
    it("should get all companies", async () => {
      await agent
        .get("/companies")
        .expect(200)
        .then(res => {
          expect(res.body).toBeInstanceOf(Array);
          expect(res.body?.length).toBeGreaterThan(0);
          expect(res.body).toEqual(
            expect.arrayContaining([
              expect.objectContaining({
                _id: createdCompanyId,
              }),
            ]),
          );
        });
    });
  });

  describe("GET /companies/:id", () => {
    it("should get a company by id", async () => {
      await agent
        .get(`/companies/${createdCompanyId}`)
        .expect(200)
        .then(res => {
          expect(res.body).toHaveProperty("_id", createdCompanyId);
        });
    });

    it("should return 404 if company not found", async () => {
      await agent.get(`/companies/${new mongoose.Types.ObjectId()}`).expect(404);
    });
  });

  describe("PUT /companies/:id", () => {
    it("should update a company", async () => {
      const updateCompanyDto: UpdateCompanyDto = {
        name: "Empresa de Teste Atualizada",
        address: "123 Main St",
        email: "new@gmail.com",
        phone: "123-456-7890",
      };

      await agent
        .put(`/companies/${createdCompanyId}`)
        .send(updateCompanyDto)
        .expect(200)
        .then(res => {
          expect(res.body).toHaveProperty("_id", createdCompanyId);
          expect(res.body).toHaveProperty("name", updateCompanyDto.name);
        });
    });

    it("should return 404 if company not found", async () => {
      await agent.put(`/companies/${new mongoose.Types.ObjectId()}`).expect(404);
    });
  });

  describe("DELETE /companies/:id", () => {
    it("should delete a company", async () => {
      await agent.delete(`/companies/${createdCompanyId}`).expect(204);
    });

    it("should return 404 if company not found", async () => {
      await agent.delete(`/companies/${new mongoose.Types.ObjectId()}`).expect(404);
    });
  });
});
