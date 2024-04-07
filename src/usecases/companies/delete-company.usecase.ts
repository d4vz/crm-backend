import { HttpException } from "@/exceptions/HttpException";
import { Company } from "@/interfaces/company.interface";
import { CompanyModel } from "@/models/company.model";
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
