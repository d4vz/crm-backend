import { HttpException } from "@/exceptions/HttpException";
import { LeadModel } from "@/models/lead.model";
import { Service } from "typedi";

@Service()
export class DeleteLeadUseCase {
  public async execute(leadId: string) {
    const deletedLead = await LeadModel.findByIdAndDelete(leadId);

    if (!deletedLead) {
      throw new HttpException(404, "Lead not found");
    }

    return deletedLead;
  }
}
