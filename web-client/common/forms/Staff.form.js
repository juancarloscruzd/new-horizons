import Form from './Form';
import FormElement from './FormElement';

export default class StaffForm extends Form {
  name = null;
  lastName = null;
  dni = null;
  dob = null;
  gender = null;
  mobilePhone = null;
  email = null;

  constructor(form) {
    super(form);
    this.name = new FormElement(form.name);
    this.lastName = new FormElement(form.lastName);
    this.dni = new FormElement(form.dni);
    this.dob = new FormElement(form.dob);
    this.gender = new FormElement(form.gender);
    this.mobilePhone = new FormElement(form.mobilePhone);
    this.email = new FormElement(form.email);
  }
}
