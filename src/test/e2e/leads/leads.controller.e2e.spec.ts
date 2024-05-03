import App from "@/app";
import { CreateLeadDto } from "@/application/dtos/leads.dto";
import { AuthRoute } from "@/application/routes/auth.route";
import { LeadsRoute } from "@/application/routes/leads.route";
import { authAgent } from "@/test/utils";
import mongoose from "mongoose";
import { SuperAgentTest } from "supertest";

describe("LeadsController (e2e)", () => {
  let createdLeadId: string;
  let app: App;
  let agent: SuperAgentTest;

  beforeAll(async () => {
    app = new App([new AuthRoute(), new LeadsRoute()]);
    agent = await authAgent(app.getServer());
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  describe("POST /leads", () => {
    it("should create a lead", async () => {
      const createLeadDto: CreateLeadDto = {
        funnelId: "60f3b4f3e6f3e3e3e3e3e3e3",
        name: "John Doe",
        address: "123 Main St",
        email: "jhoendoe@gmail.com",
        phone: "123-456-7890",
        state: "new",
      };

      await agent
        .post("/leads")
        .send(createLeadDto)
        .expect(201)
        .then(res => {
          expect(res.body).toHaveProperty("_id");
          createdLeadId = res.body._id;
        });
    });

    it("should return 400 if the request body is invalid", async () => {
      const createLeadDto: CreateLeadDto = {
        funnelId: "60f3b4f3e6f3e3e3e3e3e3e3",
        name: "John Doe",
        address: "123 Main St",
        email: "dsadasdas",
        phone: "123-456-7890",
        state: "new",
      };

      await agent.post("/leads").send(createLeadDto).expect(400);
    });
  });

  describe("GET /leads", () => {
    it("should return an array of leads", async () => {
      await agent
        .get("/leads")
        .expect(200)
        .then(res => {
          expect(res.body).toBeInstanceOf(Array);
        });
    });
  });

  describe("GET /leads/:id", () => {
    it("should return a lead by id", async () => {
      await agent
        .get(`/leads/${createdLeadId}`)
        .expect(200)
        .then(res => {
          expect(res.body).toHaveProperty("_id", createdLeadId);
        });
    });

    it("should return 404 if the lead is not found", async () => {
      await agent.get(`/leads/${new mongoose.Types.ObjectId()}`).expect(404);
    });
  });

  describe("PUT /leads/:id", () => {
    it("should update a lead by id", async () => {
      const updateLeadDto: CreateLeadDto = {
        funnelId: "60f3b4f3e6f3e3e3e3e3e3e3",
        name: "John Doe",
        address: "123 Main St",
        email: "dsae@gmail.com",
        phone: "123-456-7890",
        state: "new",
      };

      await agent
        .put(`/leads/${createdLeadId}`)
        .send(updateLeadDto)
        .expect(200)
        .then(res => {
          expect(res.body).toHaveProperty("_id", createdLeadId);
          expect(res.body).toHaveProperty("email", updateLeadDto.email);
        });
    });

    it("should return 404 if the lead is not found", async () => {
      await agent.put(`/leads/${new mongoose.Types.ObjectId()}`).expect(404);
    });

    it("should return 400 if the request body is invalid", async () => {
      const updateLeadDto: CreateLeadDto = {
        funnelId: "60f3b4f3e6f3e3e3e3e3e3e3",
        name: "John Doe",
        address: "123 Main St",
        email: "dsadasdas",
        phone: "123-456-7890",
        state: "new",
      };

      await agent.put(`/leads/${createdLeadId}`).send(updateLeadDto).expect(400);
    });
  });

  describe("DELETE /leads/:id", () => {
    it("should delete a lead by id", async () => {
      await agent.delete(`/leads/${createdLeadId}`).expect(204);
    });

    it("should return 404 if the lead is not found", async () => {
      await agent.delete(`/leads/${new mongoose.Types.ObjectId()}`).expect(404);
    });
  });
});
