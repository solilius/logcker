import { Log } from "./Log";

export type Container = {
  logs: Log[];
  isDisplayed?: boolean;
  isListening?: boolean;
  isSticky?: boolean;
  filterTerm?: string;
  isDisplayOnlyErrors?: boolean;
};

// TODO: Find a good way to get the props
export const enum ContainerProps {
  isDisplayed = "isDisplayed",
  isListening = "isListening",
  isSticky = "isSticky",
  filterTerm = "filterTerm",
  isDisplayOnlyErrors = "isDisplayOnlyErrors",
  logs = "logs",
}
