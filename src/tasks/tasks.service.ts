/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './tasks-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { getTaskFillterDto } from './dto/get-task-fillter.dto';
import { TaskRepository } from './tasks.repository';
import { Task } from './tasks.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private taskRepository: TaskRepository,
        ) {}

    async getAllTasks(fillterDto: getTaskFillterDto , user: User) : Promise<Task[]> {
        const { search, status } = fillterDto;
        const query = this.taskRepository.createQueryBuilder('task');
        query.where({ user })
        if(status){
            query.andWhere("task.status = :status" , {status})
        }
        if(search){
            query.andWhere("(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))" , {search:`%${search}%`})
        }
        const task = await query.getMany();
        return task;
    }

    async getTaskById(id: string , user: User): Promise<Task> {
        const found = await this.taskRepository.findOne({where:{id , user}});

        if(!found){
            throw new NotFoundException("تسکی با این مشخصات یافت نشد"); 
        }

        return found;
    }


    async createTask(createTaskDto: CreateTaskDto , user: User): Promise<Task> {
        const {title, description} = createTaskDto;
        const task = this.taskRepository.create({
            title,
            description,
            status: TaskStatus.OPEN,
            user
        });

        await this.taskRepository.save(task);
        return task
    }

    async deleteTaskById(id: string , user: User): Promise<void> {
        const deletedResualt = await this.taskRepository.delete({id , user});
        if(deletedResualt.affected === 0){
            throw new NotFoundException("تسکی با این مشخصات یافت نشد");
        }
    }

    async updateTaskById(id: string , status: TaskStatus , user: User): Promise<Task>{
        const task = await this.getTaskById(id , user);
        task.status = status;
        await this.taskRepository.save(task);
        return task;
    }
}
