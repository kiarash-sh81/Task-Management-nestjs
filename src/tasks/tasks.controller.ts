/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards, } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
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
    getAllTasks(@Query() fillterDto: getTaskFillterDto , @GetUser() user: User): Promise<Task[]> {
        return this.taskService.getAllTasks(fillterDto , user);
    }

    @Get("/:id")
    getTaskById(@Param("id") id: string, @GetUser() user: User): Promise<Task>{
        return this.taskService.getTaskById(id, user)
    }

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto , @GetUser() user: User): Promise<Task> {
        return this.taskService.createTask(createTaskDto , user);
    }

    @Delete("/:id")
    deleteTaskById(@Param("id") id: string, @GetUser() user: User): Promise<void> {
        return this.taskService.deleteTaskById(id , user);
    }

    @Patch("/:id/status")
    updateTaskStatus(@Param("id") id: string , @Body() updateTaskDto: updateTaskDto , @GetUser() user: User): Promise<Task>{
        const { status } = updateTaskDto
        return this.taskService.updateTaskById(id , status , user);
    }
}
