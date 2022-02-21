// eslint-disable-next-line @typescript-eslint/ban-types
export function modelUpdateSanitize(next: Function) {
  // if(this.id) {
  //   delete this.id;
  // }
  // if(this._id) {
  //   delete this._id;
  // }
  if(this.created) {
    delete this.created;
  }
  next();
}
