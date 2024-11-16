import { registerIslands } from "../lib/PreactIslands";

registerIslands({
  Button: () => import("./Button"),
});
