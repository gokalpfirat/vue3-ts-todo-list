import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { v4 as uuidv4 } from "uuid";
import type { Todo } from "@/types";

export const useTodoStore = defineStore("todoStore", () => {
  const todos = ref<Todo[]>([
    {
      id: uuidv4(),
      name: "Learn Nuxt 3",
      progress: 25,
      priority: "High",
    },
    {
      id: uuidv4(),
      name: "Clean Dishes",
      progress: 50,
      priority: "Moderate",
    },
    {
      id: uuidv4(),
      name: "Check Emails",
      progress: 75,
      priority: "Low",
    },
  ]);

  const getDoneTodoCount = computed(
    () => todos.value.filter((todo) => todo.progress === 100).length
  );
  const getTotalTodoCount = computed(() => todos.value.length);

  function deleteTodo(id: string) {
    todos.value = todos.value.filter((todo) => todo.id !== id);
  }

  function markTodoCompleted(id: string) {
    const todo = todos.value.find((todo) => todo.id === id);
    if (todo) todo.progress = 100;
  }

  function addTodo(todo: Todo) {
    todos.value.push(todo);
  }

  function editTodo(todoArg: Todo) {
    let todoIndex = todos.value.findIndex((todo) => todo.id === todoArg.id);
    todos.value[todoIndex] = todoArg;
  }
  return {
    todos,
    getDoneTodoCount,
    getTotalTodoCount,
    markTodoCompleted,
    deleteTodo,
    addTodo,
    editTodo,
  };
});
