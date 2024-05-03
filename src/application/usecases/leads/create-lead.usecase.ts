import { CreateLeadDto } from "@/application/dtos/leads.dto";
import { LeadModel } from "@/infra/models/lead.model";
import { rabbitMQServer } from "@/infra/rabbitmq/server";
import { Service } from "typedi";

@Service()
export class CreateLeadUseCase {
  async execute(leadData: CreateLeadDto) {
    const createdLead = await LeadModel.create(leadData);

    if (leadData?.email) {
      rabbitMQServer.publish("lead-email", JSON.stringify(createdLead));
    }

    if (leadData?.phone) {
      rabbitMQServer.publish("lead-phone", JSON.stringify(createdLead));
    }

    return createdLead;
  }
}
