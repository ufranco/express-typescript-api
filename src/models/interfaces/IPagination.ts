export default interface IPagination {
  page?: Number | null
  limit?: Number | null
  prev?: {
    page?: Number,
    limit?: Number,
  } | null;
  next?: {
    page?: Number,
    limit?: Number,
  }  | null;
};