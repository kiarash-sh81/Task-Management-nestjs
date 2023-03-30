/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './tasks-status.enum';
import {v4 as uuid} from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { getTaskFillterDto } from './dto/get-task-fillter.dto';
import { TaskRepository } from './tasks.repository';
import { Task } from './tasks.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository
        ) {}

    // getAllTasks(): Task[] {
    //     return this.tasks;
    // }

    // getTaskWithFillter(fillterDto: getTaskFillterDto): Task[] {
    //     const {status , search} = fillterDto
    //     let tasks = this.getAllTasks();
    //     if(status){
    //         tasks = tasks.filter((task)=> task.status === status);
    //     }
    //     if(search){
    //         tasks = tasks.filter((task)=>{
    //             if(task.title.includes(search) || task.description.includes(search)){
    //                 return true
    //             }else{
    //                 return false
    //             }
    //         });
    //     }
    //     return tasks;
    // }

    async getTaskById(id): Promise<Task> {
        const found = await this.taskRepository.findOne({where:{id}});

        if(!found){
            throw new NotFoundException("تسکی با چنین مشخصاتی یافت نشد"); 
        }

        return found;
    }

    // getTaskById(id: string): Task {
    //     const found =  this.tasks.find(task => task.id === id);
    //     if(!found){
    //         throw new NotFoundException(`task with id "${id}" not founded`);
    //     }
    //     return found;
    // }

    // createTask(createTaskDto: CreateTaskDto): Task {
    //     const {title, description} = createTaskDto;
    //     const task: Task = {
    //         id: uuid(),
    //         title,
    //         description,
    //         status: TaskStatus.OPEN,
    //     };
    //     this.tasks.push(task);

    //     return task;
    // }

    // deleteTaskById(id: string): void {
    //     const found = this.getTaskById(id);
    //     this.tasks = this.tasks.filter((task) => task.id !== found.id);
    // }

    // updateTaskById(id: string , status: TaskStatus): Task{
    //     const task: Task = this.getTaskById(id);
    //     task.status = status;
    //     return task;
    // }
}
