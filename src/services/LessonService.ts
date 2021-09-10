import { Service, Inject } from "@tsed/common";
import { EventEmitterService } from "@tsed/event-emitter";
import { MongooseModel } from "@tsed/mongoose";
import { Lesson } from "src/models/syllabus/Lesson";
import { objectDefined } from "src/utils";
import { EntityCreationUser } from "./PermissionsService";

@Service()
export class LessonService {
  @Inject(Lesson) private lesson: MongooseModel<Lesson>;
  @Inject() private eventEmitter: EventEmitterService;

  async find(id: string): Promise<Lesson | null> {
    const Lesson = await this.lesson.findById(id).exec();
    return Lesson;
  }

  async save(data: Lesson, user: EntityCreationUser): Promise<Lesson> {
    const Lesson = new this.lesson(data);
    await Lesson.save();
    this.eventEmitter.emit("entity.created", { user, moduleName: "Fee" });
    return Lesson;
  }

//   async update(id: string, data: Lesson): Promise<Lesson | null> {
//     const Lesson = await this.fee.findById(id).exec();
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

  async query(options = {}): Promise<Lesson[]> {
    options = objectDefined(options);
    return this.lesson.find(options).exec();
  }

  async remove(id: string): Promise<Lesson> {
    return await this.lesson.findById(id).remove().exec();
  }
}
