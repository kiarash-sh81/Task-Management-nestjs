/* eslint-disable prettier/prettier */
import { IsEnum, IsOptional, IsString } from "class-validator";
import { TaskStatus } from "../tasks.model";

export class getTaskFillterDto {
    @IsOptional()
    @IsEnum(TaskStatus)
    status?: TaskStatus;

    @IsOptional()
    @IsString()
    search?: string;
}