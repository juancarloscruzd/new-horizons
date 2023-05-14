import Form from './Form';
import FormElement from './FormElement';

export default class ProductForm extends Form {
  name = null;
  edition = null;
  code = null;
  theoretical_hours = null;
  practical_hours = null;
  type = null;
  mode = null;
  price = null;

  constructor(form) {
    super(form);
    this.name = new FormElement(form.name);
    this.edition = new FormElement(form.edition);
    this.code = new FormElement(form.code);
    this.theoretical_hours = new FormElement(form.theoretical_hours);
    this.practical_hours = new FormElement(form.practical_hours);
    this.type = new FormElement(form.type);
    this.mode = new FormElement(form.mode);
    this.price = new FormElement(form.price);
  }
}
