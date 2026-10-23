const connect = require("./db");
const mongoose = require("mongoose");
const Event = require("./models/Event");
const { formatValidationError } = require("./utils/formatError");

(async () => {
  await connect();

  try {
    const savedEvent = await new Event({
      title: "Campus Hack Night",
      date: "2026-11-05",
      category: "tech",
      capacity: 30,
      fee: 100,
    }).save();
    console.log("Saved event:", savedEvent);

    try {
      await new Event({
        title: "  ",
        date: "not-a-date",
        category: "cultural",
        capacity: 250,
        fee: -1,
      }).save();
      throw new Error("Invalid seed event unexpectedly passed validation");
    } catch (err) {
      if (!(err instanceof mongoose.Error.ValidationError)) throw err;
      console.log(JSON.stringify(formatValidationError(err), null, 2));
    }
  } finally {
    await mongoose.disconnect();
  }
})().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
