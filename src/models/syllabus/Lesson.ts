import { Model, ObjectID, Ref, Trim } from "@tsed/mongoose";
import {
  Default,
  Enum,
  Groups,
  MaxLength,
  MinLength,
  Property,
  Required,
} from "@tsed/schema";
import { Medium } from "../mediums/Medium";
import { Grade} from "../grades/Grades";
import {Subject} from "../subjects/Subject"
@Model({ schemaOptions: { timestamps: true } })
export class Lesson {
  @Groups("!creation", "!updation")
  @ObjectID("id")
  _id: string;

  @Ref(() => Medium)
  @Required()
  medium: Ref<Medium>;


  @Ref(() => Subject)
  @Required()
  subject: Ref<Subject>;

  
  @Ref(() => Grade)
  @Required()
  grade: Ref<Grade>;
  

  @Property()
  @Required()
  @MinLength(3)
  @MaxLength(50)
  @Trim()
  name: string;

  @Property()
  @Enum("active", "inactive")
  @Default("active")
  status: string;

}
