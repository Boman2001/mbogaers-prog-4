module.exports.ServerError = (...args) => {
  this.name = args[0].name
  this.errors = args[0].errors
  this.timestamp = new Date();
  if (this.errors){
    for (let i = 0; i < this.errors.length; i++) {
      this.errors[i] = (({message}) => ({message}))(this.errors[i]);
    }

  }

  return this;
}

