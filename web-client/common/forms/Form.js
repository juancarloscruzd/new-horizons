export default class Form {
  $form = null;

  constructor(form) {
    this.$form = form;
  }

  valid() {
    const invalid = this.formElements.find(([, $el]) => !$el.valid());

    if (invalid) {
      const [, $el] = invalid;
      $el.showInvalidMessage();
    }

    return !invalid;
  }

  toJSON() {
    return this.formElements.reduce((acc, [key, $el]) => {
      acc[key] = $el.value;
      return acc;
    }, {});
  }

  get formElements() {
    const elements = [];
    for (const key in this) {
      if (Object.hasOwnProperty.call(this, key) && key !== '$form') {
        elements.push([key, this[key]]);
      }
    }
    return elements;
  }
}
