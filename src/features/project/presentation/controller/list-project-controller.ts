import { Request, Response } from "express";
import { Controller } from "../../../../core/presentation/contracts/controller";
import { ok, serverError } from "../../../../core/presentation/helpers/http-handler";
import { ProjectRepository } from "../../infra/repositories/project-repository";

export class ListProjectByNameController implements Controller {
    constructor(private repository: ProjectRepository) {}

    async execute(req: Request, res: Response) {
        try {
            let order = req.query.order;

            order ? (order = order) : (order = "ASC");

            const result = await this.repository.listProjectByName(order as "ASC" | "DESC");

            return ok(res, result);
        } catch (error) {
            return serverError(res, String(error));
        }
    }
}
