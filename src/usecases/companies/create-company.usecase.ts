import { CreateCompanyDto } from "@/dtos/company.dto";
import { Company } from "@/interfaces/company.interface";
import { CompanyModel } from "@/models/company.model";
import { Service } from "typedi";

@Service()
export class CreateCompanyUseCase {
  async execute(data: CreateCompanyDto): Promise<Company> {
    const company = new CompanyModel(data);
    return company.save();
  }
}
