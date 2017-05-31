
export class User {
  id: String;
  firstName: String;
  lastName: String;
  imageUrl: String;
  age: Number;
  email: String;
  phone: String;
  company: String;
  address: {
    street?: String,
    city?: String,
    zip?: String,
  };

  constructor(data?: any) {
    if (data) {
      this.updateBy(data);
    }
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  updateBy(data) {
    Object.assign(this, data);
    this.address = Object.assign({}, data.address);
  }

}
