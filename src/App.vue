<script setup lang="ts">
import { useTodoStore } from "@/stores/todos";
import { storeToRefs } from "pinia";
import type { Todo } from "@/types";
import { ref } from "vue";
import TodoList from "@/components/TodoList.vue";
import TodoForm from "@/components/TodoForm.vue";

type Mode = "list" | "add" | "edit";

const mode = ref<Mode>("list");

const editingTodo = ref<Todo>();

const todoStore = useTodoStore();
const todoList = storeToRefs(todoStore).todos;

const editTodo = (todo: Todo) => {
  editingTodo.value = todo;
  mode.value = "edit";
};

const editTodoStore = (todo: Todo) => {
  todoStore.editTodo(todo);
  mode.value = "list";
  editingTodo.value = undefined;
};

const addTodo = (todo: Todo) => {
  todoStore.addTodo(todo);
  mode.value = "list";
};
</script>
<template>
  <main class="container">
    <article>
      <header>
        <nav>
          <ul>
            <li>Vue 3 Todo List</li>
          </ul>
          <ul>
            <li>
              <button v-if="mode === 'list'" @click="mode = 'add'">
                Add New Todo
              </button>
            </li>
          </ul>
        </nav>
      </header>
      <TodoList
        v-if="mode === 'list'"
        :todos="todoList"
        @edit-todo="editTodo"
      />
      <TodoForm
        v-else
        @add-todo="addTodo"
        @edit-todo="editTodoStore"
        :todo="editingTodo"
        :mode="mode"
        @cancel-todo="
          mode = 'list';
          editingTodo = undefined;
        "
      />
      <p v-if="todoStore.getDoneTodoCount === todoStore.getTotalTodoCount">
        <ins>All Todos Are Done 👏</ins>
      </p>
      <footer>
        <kbd data-tooltip="gokalpfirat@gmail.com" data-placement="right"
          >@Gökalp Fırat</kbd
        >
        <br />
        <mark data-tooltip="😜 Senior" data-placement="left"
          >Frontend Developer</mark
        >
      </footer>
    </article>
  </main>
</template>
<style>
span[role="button"] {
  margin-right: calc(var(--spacing) * 0.5);
}
progress {
  margin-bottom: 0;
}
</style>
