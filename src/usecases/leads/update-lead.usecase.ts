import { UpdateLeadDto } from "@/dtos/leads.dto";
import { HttpException } from "@/exceptions/HttpException";
import { LeadModel } from "@/models/lead.model";
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
