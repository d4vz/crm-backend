import { UpdateCompanyDto } from "@/dtos/company.dto";
import { HttpException } from "@/exceptions/HttpException";
import { Company } from "@/interfaces/company.interface";
import { CompanyModel } from "@/models/company.model";
import { Service } from "typedi";

@Service()
export class UpdateCompanyUseCase {
  async execute(id: string, data: UpdateCompanyDto): Promise<Company> {
    const updatedCompany = await CompanyModel.findByIdAndUpdate(id, data, {
      new: true,
    });

    if (!updatedCompany) {
      throw new HttpException(404, "Company not found");
    }

    return updatedCompany;
  }
}
