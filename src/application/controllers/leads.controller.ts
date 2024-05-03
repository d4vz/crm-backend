import { CreateLeadUseCase } from "@/application/usecases/leads/create-lead.usecase";
import { DeleteLeadUseCase } from "@/application/usecases/leads/delete-lead.usecase";
import { FindAllLeadsUseCase } from "@/application/usecases/leads/find-all-leads.usecase";
import { FindLeadByIdUseCase } from "@/application/usecases/leads/find-lead-by-id.usecase";
import { UpdateLeadUseCase } from "@/application/usecases/leads/update-lead.usecase";
import { Lead } from "@/domain/interfaces/lead.interface";
import { asyncHandler } from "@/utils/async-handler";
import Container from "typedi";

export class LeadsController {
  public createLeadUseCase = Container.get(CreateLeadUseCase);
  public updateLeadUseCase = Container.get(UpdateLeadUseCase);
  public deleteLeadUseCase = Container.get(DeleteLeadUseCase);
  public findLeadByIdUseCase = Container.get(FindLeadByIdUseCase);
  public findAllLeadsUseCase = Container.get(FindAllLeadsUseCase);

  public createLead = asyncHandler(async (req, res) => {
    const createdLead = await this.createLeadUseCase.execute(req.body);
    res.status(201).json(createdLead);
  });

  public updateLead = asyncHandler(async (req, res) => {
    const updatedLead = await this.updateLeadUseCase.execute(req.params.id, req.body);
    res.status(200).json(updatedLead);
  });

  public deleteLead = asyncHandler(async (req, res) => {
    await this.deleteLeadUseCase.execute(req.params.id);
    res.status(204).json();
  });

  public getLeadById = asyncHandler(async (req, res) => {
    const lead = await this.findLeadByIdUseCase.execute(req.params.id);
    res.status(200).json(lead);
  });

  public getLeads = asyncHandler(async (req, res) => {
    const leads: Lead[] = await this.findAllLeadsUseCase.execute();
    res.status(200).json(leads);
  });
}
