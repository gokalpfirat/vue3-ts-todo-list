<script setup lang="ts">
import { useTodoStore } from "@/stores/task";
import { storeToRefs } from "pinia";
import { ref, computed } from "vue";

const todoStore = useTodoStore();
const todoList = storeToRefs(todoStore).todos;

const searchText = ref<string>("");
const filteredTodos = computed(() => {
  return todoList.value.filter((todo) => todo.name.includes(searchText.value));
});
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
              <button>Add New Todo</button>
            </li>
          </ul>
        </nav>
      </header>
      <!-- <form>
        <label for="name">
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Task Name"
            required
          />
        </label>
        <button type="submit">Add</button>
      </form> -->
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
              <span role="button" class="outline" data-tooltip="Edit">✏️</span>
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
