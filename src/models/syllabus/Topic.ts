import { Model, ObjectID, Ref, Trim } from "@tsed/mongoose";
import {
  Default,
  Enum,
  Groups,
  MaxLength,
  MinLength,
  Property,
  Required,
  Minimum,
  Maximum,
  Format,

} from "@tsed/schema";
import{Lesson } from "src/models/syllabus/Lesson";

@Model({ schemaOptions: { timestamps: true } })
export class Topic {
  @Groups("!creation", "!updation")
  @ObjectID("id")
  _id: string;

  @Ref(Lesson)
  @Required()
  lesson: Ref<Lesson>;

  @Property()
  @Required()
  @MinLength(3)
  @MaxLength(50)
  @Trim()
  name: string;

  @Property()
  @Required()
  @Minimum(0)
  @Maximum(100)
  @Trim()
  progress: Number;

  @Format("date-time")
  @Default(Date.now)
  date: Date = new Date();
  
  @Property()
  @Default(false)
  completed: boolean;

  @Property()
  @Required()
  @Trim()
  note: string; 

  @Property()
  @Required()
  @Trim()
  studyMaterial: []; 

  @Property()
  @Required()
  @Trim()
  remark: string; 

  @Property()
  @Enum("active", "inactive")
  @Default("active")
  status: string;

}
