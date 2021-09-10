import { Model, ObjectID, Ref, Trim } from "@tsed/mongoose";
import { Default, Enum, Groups, Property, Required } from "@tsed/schema";
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
  @Trim()
  topicName: string;

  @Property()
  @Required()
  @Trim()
  progress: number;

  @Property()
  @Required()
  @Trim()
  scheduleDate: Date; 

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