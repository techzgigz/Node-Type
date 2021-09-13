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
  classId: "";

  @Property()
  @Required()
  subjectId: "";

  @Property()
  @Required()
  teacherId: "";



  @Property()
  @Required()
  timeFrom: TimeRanges;

  @Property()
  @Required()
  timeTo: TimeRanges; 

  @Property()
  @Required()
  roomNumber: string; 

  @Property()
  @Required()
  mode: string; 

  @Property()
  @Required()
  position: number; 

  @Property()
  @Enum("active", "inactive")
  @Default("active")
  status: string;

}
