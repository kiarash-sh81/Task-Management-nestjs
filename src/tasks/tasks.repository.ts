/* eslint-disable prettier/prettier */
import {  Repository } from "typeorm";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskStatus } from "./tasks-status.enum";
import { Task } from "./tasks.entity";


// @EntityRepository(Task)
// export class TaskRepository extends Repository<Task> {
    
// }

export class TaskRepository extends Repository<Task>{
    this: Repository<Task>;

    async createTaskRepo(this : Repository<Task> ,createTaskDto: CreateTaskDto): Promise<Task> {
        const {title, description} = createTaskDto;
        const task = this.create({
            title,
            description,
            status: TaskStatus.OPEN
        });

        await this.save(task);
        return task;
    }
}
