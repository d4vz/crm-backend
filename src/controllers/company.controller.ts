import { CreateCompanyUseCase } from "@/usecases/companies/create-company.usecase";
import { DeleteCompanyUseCase } from "@/usecases/companies/delete-company.usecase";
import { FindAllCompaniesUseCase } from "@/usecases/companies/find-all-companies.usecase";
import { FindCompanyByIdUseCase } from "@/usecases/companies/find-company-by-id.usecase";
import { UpdateCompanyUseCase } from "@/usecases/companies/update-company.usecase";
import { asyncHandler } from "@/utils/async-handler";
import Container from "typedi";

export class CompanyController {
  private createCompanyUseCase: CreateCompanyUseCase = Container.get(CreateCompanyUseCase);
  private findAllCompaniesUseCase: FindAllCompaniesUseCase = Container.get(FindAllCompaniesUseCase);
  private findCompanyByIdUseCase: FindCompanyByIdUseCase = Container.get(FindCompanyByIdUseCase);
  private updateCompanyUseCase: UpdateCompanyUseCase = Container.get(UpdateCompanyUseCase);
  private deleteCompanyUseCase: DeleteCompanyUseCase = Container.get(DeleteCompanyUseCase);

  public createCompany = asyncHandler(async (req, res) => {
    const createdCompany = await this.createCompanyUseCase.execute(req.body);
    res.status(201).json(createdCompany);
  });

  public getCompanies = asyncHandler(async (req, res) => {
    const companies = await this.findAllCompaniesUseCase.execute();
    res.status(200).json(companies);
  });

  public getCompanyById = asyncHandler(async (req, res) => {
    const company = await this.findCompanyByIdUseCase.execute(req.params.id);
    res.status(200).json(company);
  });

  public updateCompany = asyncHandler(async (req, res) => {
    const updatedCompany = await this.updateCompanyUseCase.execute(req.params.id, req.body);
    res.status(200).json(updatedCompany);
  });

  public deleteCompany = asyncHandler(async (req, res) => {
    await this.deleteCompanyUseCase.execute(req.params.id);
    res.status(204).json();
  });
}
