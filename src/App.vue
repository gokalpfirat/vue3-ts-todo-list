<template>
  <main class="container">
    <article>
      <header>
        <nav>
          <ul>
            <li>Vue 3 ToDo List</li>
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
      />
      <table role="grid">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Progress</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Test</td>
            <td>
              <progress value="25" max="100"></progress>
            </td>
            <td>
              <span role="button" class="outline">🗑️</span>
              <span role="button" class="outline contrast">✏️</span>
            </td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Test</td>
            <td><progress value="75" max="100"></progress></td>
            <td>
              <span role="button" class="outline">🗑️</span>
              <span role="button" class="outline contrast">✏️</span>
            </td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Test</td>
            <td><progress value="0" max="100"></progress></td>
            <td>
              <span role="button" class="outline">🗑️</span>
              <span role="button" class="outline contrast">✏️</span>
            </td>
          </tr>
        </tbody>
      </table>
      <footer>
        <kbd data-tooltip="gokalpfirat@gmail.com" data-placement="right"
          >@Gökalp Fırat</kbd
        >
        <br />
        <mark data-tooltip="Senior?" data-placement="right"
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
