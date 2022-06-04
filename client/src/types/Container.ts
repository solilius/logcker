import { Log } from "./Log";

export type Container = {
  isDisplayed?: boolean;
  isOn?: boolean;
  isSticky?: boolean;
  filterTerm?: string;
  isDisplayOnlyErrors?: boolean;
  logs: Log[];
};

// TODO: Find a good way to get the props
export const enum ContainerProps {
  isDisplayed = "isDisplayed",
  isOn = "isOn",
  isSticky = "isSticky",
  filterTerm = "filterTerm",
  isDisplayOnlyErrors = "isDisplayOnlyErrors",
  logs = "logs",
}
