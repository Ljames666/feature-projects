import { DeleteProjectController } from "./../controller/delete-project-controller";
import { Request, Response, Router } from "express";
import { ProjectRepository } from "../../infra/repositories/project-repository";
import { CreateProjectController } from "../controller/create-project-controller";
import { ListProjectByUidController } from "../controller/list-project-by-uid-controller";
import { ListProjectByNameController } from "../controller/list-project-controller";
import { ListProjectOfUserByNameController } from "../controller/list-project-of-user-controller";
import { UpdateProjectController } from "../controller/update-project-controller";

export class ProjectRouter {
    static getRoutes() {
        const routes = Router();

        const projectRepository = new ProjectRepository();
        const createProjectController = new CreateProjectController(projectRepository);
        const listProjectByNameController = new ListProjectByNameController(projectRepository);
        const listProjectByUidController = new ListProjectByUidController(projectRepository);
        const listProjectOfUserByName = new ListProjectOfUserByNameController(projectRepository);
        const updateProjectController = new UpdateProjectController(projectRepository);
        const deleteProjectController = new DeleteProjectController(projectRepository);

        routes.get("/", (req: Request, res: Response) => listProjectByNameController.execute(req, res));
        routes.get("/user/", (req: Request, res: Response) => listProjectOfUserByName.execute(req, res));
        routes.get("/uid/", (req: Request, res: Response) => listProjectByUidController.execute(req, res));
        routes.post("/", (req: Request, res: Response) => createProjectController.execute(req, res));
        routes.put("/", (req: Request, res: Response) => updateProjectController.execute(req, res));
        routes.delete("/", (req: Request, res: Response) => deleteProjectController.execute(req, res));

        return routes;
    }
}
