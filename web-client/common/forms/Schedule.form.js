import Form from './Form';
import FormElement from './FormElement';

export default class ScheduleForm extends Form {
  termId = null;
  productId = null;
  teacherId = null;
  startDate = null;
  iteration = null;

  constructor(form) {
    super(form);
    this.termId = new FormElement(form.termId);
    this.productId = new FormElement(form.productId);
    this.teacherId = new FormElement(form.teacherId);
    this.startDate = new FormElement(form.startDate);
    this.iteration = new FormElement(form.iteration);
  }
}
