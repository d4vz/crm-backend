import { Company } from "@/interfaces/company.interface";
import { CompanyModel } from "@/models/company.model";
import { Service } from "typedi";

@Service()
export class FindAllCompaniesUseCase {
  public async execute(): Promise<Company[]> {
    return await CompanyModel.find({});
  }
}
