import { Model, ObjectID, Ref, Trim } from "@tsed/mongoose";
import { Default, Enum, Groups, Property, Required } from "@tsed/schema";
import { Medium } from "../mediums/Medium";

@Model({ schemaOptions: { timestamps: true } })
export class Lesson {
  @Groups("!creation", "!updation")
  @ObjectID("id")
  _id: string;

  @Ref(Medium)
  @Required()
  medium: Ref<Medium>;

  @Property()
  @Required()
  @Trim()
  class: string;

  @Property()
  @Required()
  @Trim()
  subject: string;

  @Property()
  @Required()
  @Trim()
  teacher: string; 

  @Property()
  @Enum("active", "inactive")
  @Default("active")
  status: string;

}
