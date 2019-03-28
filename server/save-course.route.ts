
import {Request, Response} from 'express';
import {findCourseById} from './db-data';


export function saveCourse(req: Request, res: Response) {

  const id = req.params["id"],
    changes = req.body;

  console.log("Saving course", id, JSON.stringify(changes));

  const course = findCourseById(id);

  course.titles = changes.titles;

  res.status(200).json(course);

}

