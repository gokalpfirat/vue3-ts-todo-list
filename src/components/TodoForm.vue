<script setup lang="ts">
import { priorities } from "@/constants";
import { useTodoStore } from "@/stores/todos";
import type { Todo } from "@/types";
import { reactive, ref } from "vue";
import { v4 as uuidv4 } from "uuid";

const props = defineProps<{
  todo?: Todo;
  mode: string;
}>();

const todoInput = reactive<Todo>({
  id: props.todo?.id ?? uuidv4(),
  name: props.todo?.name ?? "",
  progress: props.todo?.progress ?? 0,
  priority: props.todo?.priority ?? "Low",
});

const emits = defineEmits<{
  (e: "add-todo", todo: Todo): void;
  (e: "edit-todo", todo: Todo): void;
  (e: "cancel-todo"): void;
}>();
</script>
<template>
  <form
    @submit.prevent="
      props.mode === 'add'
        ? emits('add-todo', todoInput)
        : emits('edit-todo', todoInput)
    "
  >
    <label for="name">
      Name
      <input
        type="text"
        name="name"
        id="name"
        placeholder="Task Name"
        required
        v-model="todoInput.name"
      />
    </label>
    <label for="range">
      Progress {{ todoInput.progress }}%
      <input
        type="range"
        name="range"
        id="range"
        min="0"
        max="100"
        v-model="todoInput.progress"
      />
    </label>
    <label for="priority">
      Priority
      <select
        name="priority"
        id="priority"
        required
        v-model="todoInput.priority"
      >
        <option :value="priority" v-for="priority in priorities">
          {{ priority }}
        </option>
      </select>
    </label>
    <div class="grid">
      <button type="submit">{{ props.mode === "add" ? "Add" : "Edit" }}</button>
      <button type="button" class="secondary" @click="emits('cancel-todo')">
        Cancel
      </button>
    </div>
  </form>
</template>
