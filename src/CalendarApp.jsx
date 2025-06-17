import { RouterProvider } from "react-router-dom";
import { AppRouter } from "./routes/AppRouter";

export const CalendarApp = () => {
  return <RouterProvider router={AppRouter} />;
};
