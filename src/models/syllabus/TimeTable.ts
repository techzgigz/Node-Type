import { Model, ObjectID, Ref, Trim } from "@tsed/mongoose";
import { Default, Enum, Groups, Property, Required } from "@tsed/schema";
import{Lesson } from "src/models/syllabus/Lesson";

@Model({ schemaOptions: { timestamps: true } })
export class TimeTable {
  @Groups("!creation", "!updation")
  @ObjectID("id")
  _id: string;

//   @Ref(Lesson)
//   @Required()
//   lesson: Ref<Lesson>;

  @Property()
  @Required()
  @Trim()
  day: string;

  @Property()
  @Required()
  @Trim()
  timeFrom: TimeRanges;

  @Property()
  @Required()
  @Trim()
  timeTo: TimeRanges; 

  @Property()
  @Required()
  @Trim()
  roomNumber: string; 

  @Property()
  @Required()
  @Trim()
  mode: string; 

  @Property()
  @Required()
  @Trim()
  position: number; 

  @Property()
  @Enum("active", "inactive")
  @Default("active")
  status: string;

}
