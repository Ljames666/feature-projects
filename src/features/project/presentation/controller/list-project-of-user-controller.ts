import { Request, Response } from "express";
import { Controller } from "../../../../core/presentation/contracts/controller";
import { ok, serverError } from "../../../../core/presentation/helpers/http-handler";
import { ProjectRepository } from "../../infra/repositories/project-repository";

export class ListProjectOfUserByNameController implements Controller {
    constructor(private repository: ProjectRepository) {}

    async execute(req: Request, res: Response) {
        try {
            let name = req.query.name as string;
            let showBy = req.query.showBy as "name" | "endDate";
            let order = req.query.order as "ASC" | "DESC";
            order ? (order = order) : (order = "ASC");

            let result;

            if (!name) {
                throw new Error("Query 'name' não informada.");
            }
            if (!showBy) {
                throw new Error("Query 'showBy' não informada.");
            }

            console.log(req.query);

            if (showBy == "endDate") {
                result = await this.repository.listProjectOfUserShownByEndDate(name, order);
            } else {
                result = await this.repository.listProjectOfUserShownByName(name, order);
            }

            return ok(res, result);
        } catch (error) {
            return serverError(res, String(error));
        }
    }
}
