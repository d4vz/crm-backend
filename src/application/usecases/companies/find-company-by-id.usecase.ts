import { Company } from "@/domain/interfaces/company.interface";
import { HttpException } from "@/infra/exceptions/HttpException";
import { CompanyModel } from "@/infra/models/company.model";
import { Service } from "typedi";

@Service()
export class FindCompanyByIdUseCase {
  public async execute(id: string): Promise<Company> {
    const foundCompany = await CompanyModel.findById(id);

    if (!foundCompany) {
      throw new HttpException(404, "Company not found");
    }

    return foundCompany;
  }
}
