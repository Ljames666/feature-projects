import { Request, Response } from "express";
import { v4 } from "uuid";
import { Controller } from "../../../../core/presentation/contracts/controller";
import { badRequest, ok, serverError } from "../../../../core/presentation/helpers/http-handler";
import { ProjectRepository } from "../../infra/repositories/project-repository";

export class CreateProjectController implements Controller {
    constructor(private repository: ProjectRepository) {}

    async execute(req: Request, res: Response) {
        try {
            const { name, description, startDate, endDate, user } = req.body;

            if (!name) {
                return badRequest(res, "Nome não informado.");
            }

            await this.repository.createProject({
                uid: v4(),
                name,
                description: description ?? undefined,
                startDate: startDate ?? undefined,
                endDate: endDate ?? undefined,
                user: user ?? undefined,
            });

            return ok(res);
        } catch (error) {
            return serverError(res, String(error));
        }
    }
}
