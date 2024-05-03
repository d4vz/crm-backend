import { CreateCompanyDto } from "@/application/dtos/company.dto";
import { Company } from "@/domain/interfaces/company.interface";
import { CompanyModel } from "@/infra/models/company.model";
import { Service } from "typedi";

@Service()
export class CreateCompanyUseCase {
  async execute(data: CreateCompanyDto): Promise<Company> {
    const company = new CompanyModel(data);
    return company.save();
  }
}
