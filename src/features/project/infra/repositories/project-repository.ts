import { Repository } from "typeorm";
import { DatabaseConnection } from "../../../../core/infra/database/connections/connection";
import { IProject } from "../../domain/model/project";
import { Project } from "../../../../core/infra/database/entities/Projects";

export class ProjectRepository {
  private repository: Repository<Project>;

  constructor() {
    this.repository = DatabaseConnection.getConnection().manager.getRepository(Project);
  }

  // cria um projeto
  async createProject(project: IProject) {
    const projectEntity = this.repository.create(project);
    await this.repository.save(projectEntity);
  }

  // lista pelo uid do projeto
  async listProjectByUid(uid: string) {
    return await this.repository.findOne(uid);
  }

  // lista todos os projetos
  async listProjectByName(order?: "ASC" | "DESC") {
    order ? (order = order) : (order = "ASC");
    return await this.repository.find({
      order: {
        name: order,
      },
    });
  }

  // lista os projetos do user específico, ordenado por nome
  async listProjectOfUserShownByName(name: string, order?: "ASC" | "DESC") {
    order ? (order = order) : (order = "ASC");
    return await this.repository.find({
      order: {
        name: order,
      },
      where: {
        user: {
          username: name,
        },
      },
    });
  }

  // lista os projetos do user específico, ordenado por endDate
  async listProjectOfUserShownByEndDate(name: string, order?: "ASC" | "DESC") {
    order ? (order = order) : (order = "ASC");
    return await this.repository.find({
      order: {
        endDate: order,
      },
      where: {
        user: {
          username: name,
        },
      },
    });
  }

  // atualiza um projeto pelo uid
  async updateProjectByUid(uid: string, data: Partial<IProject>) {
    const project = await this.repository.findOne(uid);

    if (!project) {
      throw Error("Projeto não existe.");
    }

    return await this.repository.update(uid, {
      name: data.name ?? project.name,
      description: data.description ?? project.description,
      startDate: data.startDate ?? project.startDate,
      endDate: data.endDate ?? project.endDate,
      user: data.user ?? project.user,
    });
  }

  // deleta um projeto peo uid
  async deleteProjectByUid(uid: string) {
    return await this.repository.delete(uid);
  }
}
