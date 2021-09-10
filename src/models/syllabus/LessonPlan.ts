import { Model, ObjectID, Ref, Trim } from "@tsed/mongoose";
import { Default, Enum, Groups, Property, Required } from "@tsed/schema";
import{Topic} from "src/models/syllabus/Topic";

@Model({ schemaOptions: { timestamps: true } })
export class LessonPlan {
  @Groups("!creation", "!updation")
  @ObjectID("id")
  _id: string;

  @Ref(Topic)
  @Required()
  topic: Ref<Topic>;

  @Property()
  @Required()
  @Trim()
  subTopic: string;

  @Property()
  @Required()
  @Trim()
  date: Date;

  @Property()
  @Required()
  @Trim()
  startTime: TimeRanges; 

  @Property()
  @Required()
  @Trim()
  endTime: TimeRanges; 

  @Property()
  @Required()
  @Trim()
  youTubeUrl: string; 

  @Property()
  @Required()
  @Trim()
  document: []; 

  @Property()
  @Required()
  @Trim()
  teachingMethod: string; 

  @Property()
  @Required()
  @Trim()
  generalObjective: string; 

  @Property()
  @Required()
  @Trim()
  previousKnowledge: string; 

  @Property()
  @Required()
  @Trim()
 question: string; 

 @Property()
  @Required()
  @Trim()
  presentation: string; 

  @Property()
  @Enum("active", "inactive")
  @Default("active")
  status: string;

}
