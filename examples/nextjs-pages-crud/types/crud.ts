type ID = string;
export interface CrudState {
  add?: boolean;
  edit?: boolean | ID;
  delete?: boolean | ID;
}
