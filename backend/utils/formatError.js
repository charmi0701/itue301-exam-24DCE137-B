// TODO: turn a Mongoose ValidationError into a clean, client-safe object:
//   { error: "Validation failed", details: [ { field, message }, ... ] }
function formatValidationError(err) {
  return {
    error: "Validation failed",
    details: Object.entries(err.errors || {}).map(([field, validationError]) => ({
      field,
      message: validationError.message,
    })),
  };
}

module.exports = { formatValidationError };
