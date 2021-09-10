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
  import{ Topic } from "src/models/syllabus/Topic";
  import { TopicService } from "src/services/TopicService";
  
  @Controller("/topic")
  export class TopicController {
    constructor(private topicService: TopicService) {}
  
    @Get("/")
    @Authorize("jwt")
    @AcceptRoles("admin")
    @Summary("Return all Lesson")
    @Returns(200, Topic)
    async getAllLesson(@Req() request: Req): Promise<Topic[]> {
      let query = {};
      if ((request.user as any).role !== "superadmin") {
        query = { _id: request.permissions?.readIds };
      }
      return this.topicService.query(query);
    }
  
    @Get("/:id")
    @Authorize("jwt")
    @AcceptRoles("admin")
    @Summary("Return Lesson based on id")
    @Returns(200, Topic)
    async getLesson(
      @PathParams("id") id: string,
      @Req() request: Req
    ): Promise<Topic | null> {
      if (
        (request.user as any).role !== "superadmin" &&
        !request.permissions?.readIds?.includes(id)
      ) {
        throw new Error("You don't have sufficient permissions");
      }
      return this.topicService.find(id);
    }
  
    @Post("/")
    @Authorize("jwt")
    @AcceptRoles("admin")
    @Summary("Create new Lesson")
    @Returns(201, Topic)
    async createLesson(
      @Req() request: Req,
      @Description("Lesson model")
      @BodyParams()
      @Groups("creation")
      data: Topic
    ): Promise<Topic> {
      if (request.user) {
        data = { ...data};
      }
      return this.topicService.save(data, {
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
      await this.topicService.remove(id);
    }
  }
  