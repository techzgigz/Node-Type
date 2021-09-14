import { Service, Inject } from "@tsed/common";
import { EventEmitterService } from "@tsed/event-emitter";
import { MongooseModel } from "@tsed/mongoose";
import { Content} from "src/models/download/Content";
import { objectDefined } from "src/utils";
import { EntityCreationUser } from "./PermissionsService";

@Service()
export class ContentService {
  @Inject(Content) private Content: MongooseModel<Content>;
  @Inject() private eventEmitter: EventEmitterService;

  async find(id: string): Promise<Content | null> {
    const content= await this.Content.findById(id).exec();
    return content;
  }

  async save(data:  Content, user: EntityCreationUser): Promise<Content> {
    const content = new this.Content(data);
    await content.save();
    this.eventEmitter.emit("entity.created", { user, moduleName: "Fee" });
    return content;
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

  async query(options = {}): Promise<Content[]> {
    options = objectDefined(options);
    return this.Content.find(options).exec();
  }

  async remove(id: string): Promise< Content> {
    return await this.Content.findById(id).remove().exec();
  }
}
