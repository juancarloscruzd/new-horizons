import Form from './Form';
import FormElement from './FormElement';

export default class TermForm extends Form {
  name = null;
  start_date = null;
  end_date = null;
  non_working_days = null;

  constructor(form) {
    super(form);
    this.name = new FormElement(form.name);
    this.start_date = new FormElement(form.start_date);
    this.end_date = new FormElement(form.end_date);
    this.non_working_days = new FormElement(form.non_working_days);
  }
}
