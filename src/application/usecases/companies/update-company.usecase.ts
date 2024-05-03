import { UpdateCompanyDto } from "@/application/dtos/company.dto";
import { Company } from "@/domain/interfaces/company.interface";
import { HttpException } from "@/infra/exceptions/HttpException";
import { CompanyModel } from "@/infra/models/company.model";
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
