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
  import{ TimeTable } from "src/models/syllabus/TimeTable";
  import {   TimeTableService } from "src/services/TimeTableService";
  
  @Controller("/timeTable")
  export class TimeTableController{
    constructor(private timetableService:  TimeTableService) {}
  
    @Get("/")
    @Authorize("jwt")
    @AcceptRoles("admin")
    @Summary("Return all Lesson")
    @Returns(200, TimeTable)
    async getAllLesson(@Req() request: Req): Promise<TimeTable[]> {
      let query = {};
      if ((request.user as any).role !== "superadmin") {
        query = { _id: request.permissions.readIds };
      }
      return this.timetableService.query(query);
    }
  
    @Get("/:id")
    @Authorize("jwt")
    @AcceptRoles("admin")
    @Summary("Return Lesson based on id")
    @Returns(200, TimeTable)
    async getLesson(
      @PathParams("id") id: string,
      @Req() request: Req
    ): Promise<TimeTable | null> {
      if (
        (request.user as any).role !== "superadmin" &&
        !request.permissions.readIds.includes(id)
      ) {
        throw new Error("You don't have sufficient permissions");
      }
      return this.timetableService.find(id);
    }
  
    @Post("/")
    @Authorize("jwt")
    @AcceptRoles("admin")
    @Summary("Create new Lesson")
    @Returns(201, TimeTable )
    async createLesson(
      @Req() request: Req,
      @Description("Lesson model")
      @BodyParams()
      @Groups("creation")
      data: TimeTable 
    ): Promise<TimeTable > {
      if (request.user) {
        data = { ...data};
      }
      return this.timetableService.save(data, {
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
      await this.timetableService.remove(id);
    }
  }
  