/* Class custom express error */
function fn(message: any, statusCode: number) {
  /* Properties */
  const props = { message, statusCode };

  /* Public */
  return Object.assign(props, Error);
}

export default fn;
