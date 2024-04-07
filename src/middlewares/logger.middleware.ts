import morgan from "morgan";

morgan.token("statusColor", (req, res) => {
  // get the status code if response written
  const status = res.statusCode;

  const color =
    status >= 500
      ? 31 // red
      : status >= 400
      ? 33 // yellow
      : status >= 300
      ? 36 // cyan
      : status >= 200
      ? 32 // green
      : 0; // no color

  const message = res.statusMessage || "no status message";
  return "\x1b[" + color + "m" + status + "\x1b[0m " + message;
});

morgan.token("user", req => {
  const user = req["user"];
  if (user) return user["_id"];
});

export const morganMiddleware = morgan(":method :url >> StatusCode:: :statusColor - :response-time ms \nuser: :user \n");
