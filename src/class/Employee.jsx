class Employee {
  constructor({ id, first_name, last_name, date_of_birth, salary }) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.date_of_birth = date_of_birth;
    this.salary = salary;
  }

  getData = () => {
    const employee = {
      first_name: this.first_name,
      last_name: this.last_name,
      date_of_birth: this.date_of_birth,
      salary: this.salary,
    };

    return employee;
  };
}

export default Employee;
