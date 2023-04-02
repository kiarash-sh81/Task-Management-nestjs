/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards, } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateTaskDto } from './dto/create-task.dto';
import { getTaskFillterDto } from './dto/get-task-fillter.dto';
import { updateTaskDto } from './dto/update-task.dto';
import { Task } from './tasks.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    constructor(private taskService: TasksService) {}

    @Get()
    getAllTasks(@Query() fillterDto: getTaskFillterDto): Promise<Task[]> {
        return this.taskService.getAllTasks(fillterDto);
    }

    @Get("/:id")
    getTaskById(@Param("id") id: string): Promise<Task>{
        return this.taskService.getTaskById(id)
    }

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        return this.taskService.createTask(createTaskDto);
    }

    @Delete("/:id")
    deleteTaskById(@Param("id") id: string): Promise<void> {
        return this.taskService.deleteTaskById(id);
    }

    @Patch("/:id/status")
    updateTaskStatus(@Param("id") id: string , @Body() updateTaskDto: updateTaskDto): Promise<Task>{
        const { status } = updateTaskDto
        return this.taskService.updateTaskById(id , status);
    }
}
