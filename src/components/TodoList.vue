<script setup lang="ts">
import { useTodoStore } from "@/stores/todos";
import type { Todo } from "@/types";
import { computed, ref } from "vue";

type PropTypes = {
  todos: Todo[];
};
const todoStore = useTodoStore();
const props = defineProps<PropTypes>();
const emits = defineEmits<{
  (e: "edit-todo", todo: Todo): void;
}>();
const searchText = ref<string>("");
const filteredTodos = computed(() => {
  return props.todos.filter((todo) => todo.name.includes(searchText.value));
});
</script>
<template>
  <input
    type="search"
    name="search"
    id="search"
    placeholder="Search A Todo"
    v-model="searchText"
  />
  <table role="grid">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Name</th>
        <th scope="col">Progress</th>
        <th scope="col">Priority</th>
        <th scope="col">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(todo, index) in filteredTodos">
        <th scope="row">{{ index + 1 }}</th>
        <td>{{ todo.name }}</td>
        <td>
          <progress :value="todo.progress" max="100"></progress>
        </td>
        <td>
          <kbd>{{ todo.priority }}</kbd>
        </td>
        <td>
          <span
            role="button"
            class="outline"
            data-tooltip="Delete"
            @click="todoStore.deleteTodo(todo.id)"
            >🗑️</span
          >
          <span
            role="button"
            class="outline"
            data-tooltip="Edit"
            @click="emits('edit-todo', todo)"
            >✏️</span
          >
          <span
            role="button"
            class="outline"
            data-tooltip="Mark As Completed"
            @click="todoStore.markTodoCompleted(todo.id)"
            >✅</span
          >
        </td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <th scope="row">Total</th>
        <td>
          {{ todoStore.getDoneTodoCount }}/{{ todoStore.getTotalTodoCount }}
        </td>
        <td>
          <progress
            :value="
              todoStore.getTotalTodoCount > 0
                ? Math.floor(
                    (100 * todoStore.getDoneTodoCount) /
                      todoStore.getTotalTodoCount
                  )
                : 0
            "
            max="100"
          ></progress>
        </td>
      </tr>
    </tfoot>
  </table>
</template>
