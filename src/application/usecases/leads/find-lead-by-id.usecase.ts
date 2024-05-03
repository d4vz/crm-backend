import { HttpException } from "@/infra/exceptions/HttpException";
import { LeadModel } from "@/infra/models/lead.model";
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
