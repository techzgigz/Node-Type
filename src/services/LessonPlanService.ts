import { Service, Inject } from "@tsed/common";
import { EventEmitterService } from "@tsed/event-emitter";
import { MongooseModel } from "@tsed/mongoose";
import { LessonPlan } from "src/models/syllabus/lessonPlan";
import { objectDefined } from "src/utils";
import { EntityCreationUser } from "./PermissionsService";

@Service()
export class LessonPlanService {
  @Inject(LessonPlan) private LessonPlan: MongooseModel<LessonPlan>;
  @Inject() private eventEmitter: EventEmitterService;

  async find(id: string): Promise<LessonPlan | null> {
    const LessonPlan = await this.LessonPlan.findById(id).exec();
    return LessonPlan;
  }

  async save(data: LessonPlan, user: EntityCreationUser): Promise<LessonPlan> {
    const lessonPlan = new this.LessonPlan(data);
    await lessonPlan.save();
    this.eventEmitter.emit("entity.created", { user, moduleName: "Fee" });
    return lessonPlan;
  }

//   async update(id: string, data: lessonPlan): Promise<lessonPlan | null> {
//     const lessonPlan = await this.fee.findById(id).exec();
//     if (Fee) {
//       Fee.school = data.school;
//       Fee.grade = data.grade;
//       Fee.medium = data.medium;
//       Fee.info = data.info;
//       Fee.status = data.status;
//       await Fee.save();
//     }
//     return Fee;
//   }

  async query(options = {}): Promise<LessonPlan[]> {
    options = objectDefined(options);
    return this.LessonPlan.find(options).exec();
  }

  async remove(id: string): Promise<LessonPlan> {
    return await this.LessonPlan.findById(id).remove().exec();
  }
}
