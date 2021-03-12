import Task from "../models/Task";
import {  NextFunction, request } from 'express';
import IRequest from '../models/interfaces/IRequest';
import IResponse from '../models/interfaces/IResponse';
import Pagination from '../models/interfaces/IPagination';
import  asyncHandler from "../middleware/asyncHandler";
import ErrorResponse from "../utils/errorResponse";
import { timingSafeEqual } from "crypto";


export const getTasks = asyncHandler( 
  async (req: IRequest, res: IResponse): Promise<IResponse> => {
  let query;
  const reqQuery = { ...req.query };
  const removeFields = ["select"];

  removeFields.forEach((param) => delete reqQuery[param]);

  let queryStr: string = JSON.stringify(reqQuery);

  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    match => `$${match}`
  );

  query = Task.find(JSON.parse(queryStr));

  let fields: String[] = req.query.select ? String(req.query.select).split(",")
    :
    [];

  query = query.select(fields.join(" "));

  if (req.query.sort) {
    const sortBy = String(req.query.sort).split(",").join(" ");
    query.sort(sortBy);
  } else {
    query = query.sort("username");
  }

  const page = req.pagination ? parseInt(String(req.pagination.page), 10): 1;
  const limit =  req.pagination ? parseInt(String(req.pagination.limit), 10) : 20;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Task.countDocuments();

  let pagination: Pagination = {
    prev : startIndex > 0 ? {
      page: page - 1,
      limit: limit,
    } : null,
    next: endIndex < total ? {
      page: page + 1,
      limit: limit,
    } : null,
  } ;

  query = query.skip(startIndex).limit(limit);
  const tasks = await query;

  return res.status(200).json({
    success: true,
    count: tasks.length,
    pagination: pagination,
    data: tasks,
  });
});

export const createTask = asyncHandler(async (req: IRequest, res: IResponse, next: NextFunction) => {
  const task : Task = {
    name: req.task.name,
    description: req.task.description,
    points: req.task.points,
    review: req.task.review,
    startDate: req.task.startDate,
    finished: false,
    responsible: req.task.responsible,

  }

  const id = await task.save();

  res.status(200).json(
    {
      task: {
        id
      }
    }
  )
});


export const getTask = asyncHandler(async (req: IRequest, res: IResponse, next: NextFunction) => {
  const task = await Task.findById(req.params.id).select('-password');

  if (!task) {
    return next(
      new ErrorResponse(`User not found with id of ${req.params.id}`, 200)
    );
  }


  return res.status(200).json({
    success: true,
    data: task,
  });

});

export const updateTask = asyncHandler(async (req: IRequest, res: IResponse): Promise<IResponse> => {
  const task = Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!task) {
    return res.status(400).json({ success: false });
  }

  return res.status(200).json({
    success: true,
    msg: "User info updated",
  });

});

export const deleteTask = asyncHandler(async (req: IRequest, res: IResponse): Promise<IResponse> => {
  const data = Task.findByIdAndDelete(req.params.id);

  if (!data) {
    return res.status(400).json({ success: false });
  }

  return res.status(200).json({
    success: true,
    data: {},
  });

});
