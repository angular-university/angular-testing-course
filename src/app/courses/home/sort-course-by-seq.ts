import {Course} from '../model/course';


export function sortCoursesBySeqNo(c1:Course, c2: Course) {
  return c1.seqNo - c2.seqNo;

}
