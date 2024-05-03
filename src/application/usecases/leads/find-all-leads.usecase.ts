import { LeadModel } from "@/infra/models/lead.model";
import { Service } from "typedi";

@Service()
export class FindAllLeadsUseCase {
  async execute() {
    return await LeadModel.find({});
  }
}
