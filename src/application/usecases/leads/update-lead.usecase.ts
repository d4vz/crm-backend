import { UpdateLeadDto } from "@/application/dtos/leads.dto";
import { HttpException } from "@/infra/exceptions/HttpException";
import { LeadModel } from "@/infra/models/lead.model";
import { Service } from "typedi";

@Service()
export class UpdateLeadUseCase {
  async execute(id: string, leadData: UpdateLeadDto) {
    const updatedLead = await LeadModel.findByIdAndUpdate(id, leadData, { new: true });

    if (!updatedLead) {
      throw new HttpException(404, "Lead not found");
    }

    return updatedLead;
  }
}
