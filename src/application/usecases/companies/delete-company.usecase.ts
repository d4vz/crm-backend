import { Company } from "@/domain/interfaces/company.interface";
import { HttpException } from "@/infra/exceptions/HttpException";
import { CompanyModel } from "@/infra/models/company.model";
import { Service } from "typedi";

@Service()
export class DeleteCompanyUseCase {
  async execute(id: string): Promise<Company> {
    const deletedCompany = await CompanyModel.findByIdAndDelete(id);

    if (!deletedCompany) {
      throw new HttpException(404, "Company not found");
    }

    return deletedCompany;
  }
}
