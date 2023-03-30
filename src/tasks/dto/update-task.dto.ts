/* eslint-disable prettier/prettier */
import { IsEnum } from "class-validator";
import { TaskStatus } from "../tasks.model";

export class updateTaskDto{
    @IsEnum(TaskStatus)
    status: TaskStatus
}