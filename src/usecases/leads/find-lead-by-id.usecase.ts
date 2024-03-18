import { HttpException } from "@/exceptions/HttpException";
import { LeadModel } from "@/models/lead.model";
import { Service } from "typedi";

@Service()
export class FindLeadByIdUseCase {
  public async execute(leadId: string) {
    const findedLead = await LeadModel.findById(leadId);

    if (!findedLead) {
      throw new HttpException(404, "Lead not found");
    }

    return findedLead;
  }
}
