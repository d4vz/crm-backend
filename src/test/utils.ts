import { Application } from "express";
import { SuperAgentTest, agent as supertest } from "supertest";

export const testUser = {
  email: "teste@gmail.com",
  password: "d329hdo82uhacc",
};

export const authAgent = async (app: Application): Promise<SuperAgentTest> => {
  const agent = supertest(app);

  await agent
    .post("/auth/login")
    .send(testUser)
    .set("Content-Type", "application/json")
    .then(response => {
      const cookies = response.header["set-cookie"];
      if (!cookies) throw new Error("No cookies");
      agent.set("Cookie", cookies[0]);
    });

  return agent;
};
