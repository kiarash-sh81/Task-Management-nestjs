/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { getTaskFillterDto } from './dto/get-task-fillter.dto';
import { updateTaskDto } from './dto/update-task.dto';
import { TaskStatus } from './tasks-status.enum';
import { Task } from './tasks.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) {}

    // @Get()
    // getAllTasks(@Query() fillterDto: getTaskFillterDto): Task[] {
    //     if(Object.keys(fillterDto).length){
    //         return this.taskService.getTaskWithFillter(fillterDto)
    //     }else{
    //         return this.taskService.getAllTasks();
    //     }
    // }

    @Get("/:id")
    getTaskById(@Param("id") id: string): Promise<Task>{
        return this.taskService.getTaskById(id)
    }

    // @Post()
    // createTask(@Body() createTaskDto: CreateTaskDto): Task {
    //     return this.taskService.createTask(createTaskDto);
    // }

    // @Delete("/:id")
    // deleteTaskById(@Param("id") id: string): void{
    //     return this.taskService.deleteTaskById(id);
    // }

    // @Patch("/:id/status")
    // updateTaskStatus(@Param("id") id: string , @Body() updateTaskDto: updateTaskDto): Task{
    //     const { status } = updateTaskDto
    //     return this.taskService.updateTaskById(id , status);
    // }
}
