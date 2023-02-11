import type { priorities } from "./constants";

export type Todo = {
  id: string;
  name: string;
  progress: number;
  priority: typeof priorities[number];
};
