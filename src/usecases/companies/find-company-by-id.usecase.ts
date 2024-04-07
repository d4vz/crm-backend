import { HttpException } from "@/exceptions/HttpException";
import { Company } from "@/interfaces/company.interface";
import { CompanyModel } from "@/models/company.model";
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
