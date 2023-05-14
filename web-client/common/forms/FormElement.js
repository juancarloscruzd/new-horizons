export default class FormElement {
  $el = null;

  constructor(element) {
    this.$el = element;
  }

  valid() {
    return this.$el.checkValidity();
  }

  showInvalidMessage() {
    return this.$el.reportValidity();
  }

  get value() {
    if (this.$el.multiple) {
      return [...this.$el.options]
        .filter((o) => o.selected)
        .map((o) => o.value);
    }
    return this.$el.value;
  }

  set value(val) {
    throw new Error('Not allowed!');
  }
}
