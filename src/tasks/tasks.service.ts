/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './tasks-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { getTaskFillterDto } from './dto/get-task-fillter.dto';
import { TaskRepository } from './tasks.repository';
import { Task } from './tasks.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private taskRepository: TaskRepository,
        ) {}

    async getAllTasks(fillterDto: getTaskFillterDto) : Promise<Task[]> {
        const { search, status } = fillterDto;
        const query = this.taskRepository.createQueryBuilder('task');
        if(status){
            query.andWhere("task.status = :status" , {status})
        }
        if(search){
            query.andWhere("LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)" , {search:`%${search}%`})
        }
        const task = await query.getMany();
        return task;
    }

    async getTaskById(id: string): Promise<Task> {
        const found = await this.taskRepository.findOne({where:{id}});

        if(!found){
            throw new NotFoundException("تسکی با این مشخصات یافت نشد"); 
        }

        return found;
    }


    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const {title, description} = createTaskDto;
        const task = this.taskRepository.create({
            title,
            description,
            status: TaskStatus.OPEN
        });

        await this.taskRepository.save(task);
        return task
    }

    async deleteTaskById(id: string): Promise<void> {
        const deletedResualt = await this.taskRepository.delete(id);
        if(deletedResualt.affected === 0){
            throw new NotFoundException("تسکی با این مشخصات یافت نشد");
        }
    }

    async updateTaskById(id: string , status: TaskStatus): Promise<Task>{
        const task = await this.getTaskById(id);
        task.status = status;
        await this.taskRepository.save(task);
        return task;
    }
}
