import User from "../models/User";
import {  NextFunction } from 'express';
import IUserRequest from '../models/interfaces/IUserRequest';
import IUserResponse from '../models/interfaces/IUserResponse';
import Pagination from '../models/interfaces/IPagination';
import  asyncHandler from "../middleware/asyncHandler";
import ErrorResponse from "../utils/errorResponse";

/**
 * @description Get all users
 * @route GET /api/user
 * @access Public
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */

export const getUsers = asyncHandler( async (req: IUserRequest, res: IUserResponse): Promise<IUserResponse> => {
  let query;
  const reqQuery = { ...req.query };
  const removeFields = ["select"];

  removeFields.forEach((param) => delete reqQuery[param]);

  let queryStr: string = JSON.stringify(reqQuery);

  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    match => `$${match}`
  );

  query = User.find(JSON.parse(queryStr));

  let fields: String[] = req.query.select ? String(req.query.select).split(",")
    :
    [];

  fields.push('-password');
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
  const total = await User.countDocuments();

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
  const users = await query;

  

  return res.status(200).json({
    success: true,
    count: users.length,
    pagination: pagination,
    data: users,
  });
});

/**
 * @description Get task
 * @route GET /api/user/:id
 * @access Public
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */

export const getUser = asyncHandler(async (req: IUserRequest, res: IUserResponse, next: NextFunction) => {
  const user = await User.findById(req.params.id).select('-password');

  if (!user) {
    return next(
      new ErrorResponse(`User not found with id of ${req.params.id}`, 200)
    );
  }


  return res.status(200).json({
    success: true,
    data: user,
  });

});

/**
 * @description Update user
 * @route PUT /api/v1/user/:id
 * @access Private
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */

export const updateUser = asyncHandler(async (req: IUserRequest, res: IUserResponse): Promise<IUserResponse> => {
  const user = User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    return res.status(400).json({ success: false });
  }

  return res.status(200).json({
    success: true,
    msg: "User info updated",
  });

});

/**
 * @description Update user
 * @route DELETE /api/v1/user/:id
 * @access Private
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */

export const deleteUser = asyncHandler(async (req: IUserRequest, res: IUserResponse): Promise<IUserResponse> => {
  const data = User.findByIdAndDelete(req.params.id);

  if (!data) {
    return res.status(400).json({ success: false });
  }

  return res.status(200).json({
    success: true,
    data: {},
  });

});
