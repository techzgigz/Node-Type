import { Service, Inject } from "@tsed/common";
import { EventEmitterService } from "@tsed/event-emitter";
import { MongooseModel } from "@tsed/mongoose";
import { Topic } from "src/models/syllabus/Topic";
import { objectDefined } from "src/utils";
import { EntityCreationUser } from "./PermissionsService";

@Service()
export class TimeTableService {
  @Inject(Topic) private Topic: MongooseModel<TimeTable>;
  @Inject() private eventEmitter: EventEmitterService;

  async find(id: string): Promise<Topic | null> {
    const topic = await this.TimeTable.findById(id).exec();
    return topic;
  }

  async save(data: TimeTable, user: EntityCreationUser): Promise<Topic> {
    const topic = new this.Topic(data);
    await topic.save();
    this.eventEmitter.emit("entity.created", { user, moduleName: "Fee" });
    return topic;
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

  async query(options = {}): Promise<Topic[]> {
    options = objectDefined(options);
    return this.TimeTable.find(options).exec();
  }

  async remove(id: string): Promise<Topic> {
    return await this.TimeTable.findById(id).remove().exec();
  }
}
