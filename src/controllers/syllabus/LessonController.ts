import {
    BodyParams,
    Controller,
    Delete,
    Get,
    PathParams,
    Post,
    Put,
    Req,
  } from "@tsed/common";
  import { Authorize } from "@tsed/passport";
  import {
    Description,
    Groups,
    Required,
    Returns,
    Status,
    Summary,
  } from "@tsed/schema";
  import { AcceptRoles } from "src/decorators/AcceptRoles";
  import{Lesson } from "src/models/syllabus/Lesson";
  import { LessonService } from "src/services/LessonService";
  import { User } from "src/models/users/User";
  import * as multer from 'multer'

  @Controller("/lesson")
  export class LessonController {
    constructor(private lessonService: LessonService) {}
  
    @Get("/")
    @Authorize("jwt")
    @AcceptRoles("admin")
    @Summary("Return all Lesson")
    @Returns(200, Lesson)
    async getAllLesson(@Req() request: Req): Promise<Lesson[]> {
      let query = {};
      if ((request.user as any).role !== "superadmin") {
        query = { _id: request.permissions.readIds };
      }
      return this.lessonService.query(query);
    }
  
    @Get("/:id")
    @Authorize("jwt")
    @AcceptRoles("admin")
    @Summary("Return Lesson based on id")
    @Returns(200, Lesson)
    async getLesson(
      @PathParams("id") id: string,
      @Req() request: Req
    ): Promise<Lesson | null> {
      if (
        (request.user as any).role !== "superadmin" &&
        !request.permissions.readIds.includes(id)
      ) {
        throw new Error("You don't have sufficient permissions");
      }
      return this.lessonService.find(id);
    }
  
    @Post("/")
    @Authorize("jwt")
    @AcceptRoles("admin")
    @Summary("Create new Lesson")
    @Returns(201, Lesson)
    async createLesson(
      @Req() request: Req,
      @Required()
      @Description("User model")
      @BodyParams("user")
      @Groups("creation")
      user: User,
      @Description("Lesson model")
      @BodyParams()
      @Groups("creation")
      data: Lesson
    ): Promise<Lesson> {
       
      
      if (request.user) {
        data = { ...data};
      }
      return this.lessonService.save(data, {
        role: (request.user as any).role,
        _id: (request.user as any)._id,
        adminId: (request.user as any).adminId,
      });
    }
  
    // @Put("/:id")
    // @Authorize("jwt")
    // @AcceptRoles("admin")
    // @Summary("Update Lesson with id")
    // @Status(201, { description: "Updated Lesson", type: Lesson })
    // update(
    //   @PathParams("id") @Required() id: string,
    //   @BodyParams() @Required() @Groups('updation') Lesson: Lesson
    // ): Promise<Lesson | null> {
    //   return this.lessonService.update(id, Lesson);
    // }
  
    @Delete("/:id")
    @Authorize("jwt")
    @AcceptRoles("admin")
    @Summary("Remove a Lesson")
    @Status(204, { description: "No content" })
    async remove(@PathParams("id") id: string): Promise<void> {
      await this.lessonService.remove(id);
    }
  }
  