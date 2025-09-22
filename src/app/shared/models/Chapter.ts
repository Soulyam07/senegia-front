import {Lesson} from './Lesson';

export interface Chapter{
  id: number;
  title: string;
  course_id:any;
  total_duration:any;
  total_lectures:any;
  lessons?: Lesson[];
}
