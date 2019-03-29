export interface Course {
  id:number;
  seqNo:number;
  titles: {
    description:string;
    longDescription?: string;
  };
  iconUrl: string;
  uploadedImageUrl:string;
  courseListIcon: string;
  category:string;
  lessonsCount:number;
}
