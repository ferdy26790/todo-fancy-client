<template>
  <div class="col-md-8 ">
    <h2>My Todo</h2>
    <table v-if="todosUncomplete.length > 0" class="table table-hover">
      <thead>
        <tr>
          <th scope="col">Complete</th>
          <th scope="col">Todo</th>
          <th scope="col">Reminder</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="todo in todosUncomplete" class="table-light">
          <td v-if="todo.status == 'uncomplete'"><a @click="completeTodo(todo._id)" href="#"><i class="far fa-square"></i></a></td>
          <td v-else><a href="#"><i class="fas fa-check"></i></a></td>
          <td>{{todo.name}}</td>
          <td v-if="!todo.reminder" ><a @click="showTodoEditReminder(todo._id)" href="#"><i class="fa fa-clock"></i> set reminder</a>
            <div v-if="todo.isEditReminder" class="form-group">
              <label class="col-form-label" for="inputDefault">Set Reminder</label>
              <input type="date" v-model="time" class="form-control" placeholder="enter reminder..." id="inputDefault">
              <button type="button" class="btn-primary" @click="setReminder(todo._id)">Set Reminder</button>
              <button type="button" class="btn-primary" @click="hideTodoEditReminder(todo._id)">Cancel</button>
            </div>
          </td>
          <td v-if="todo.reminder">{{todo.reminder}}</td>
          <td v-if="isDelete"><a @click="deleteTodo(todo._id)" href="#"><i class="fa fa-trash-alt"></i></a></td>
          <td v-if="isEdit"><a @click="showTodoEdit(todo._id)" href="#"><i class="fa fa-edit"></i></a>
            <div v-if="todo.isEdit" class="form-group">
              <label class="col-form-label" for="inputDefault">Edit Task</label>
              <input type="text" v-model="name" class="form-control" placeholder="Enter Name Task...." id="inputDefault">
              <button type="button" class="btn-primary" @click="setReminder(todo._id)">Edit</button>
              <button type="button" class="btn-primary" @click="hideTodoEdit(todo._id)">Cancel</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <h4 v-else> No todos yet </h4>
    <br> <br> <br>
    <div v-if="todosComplete.length > 0 && showTodosCompleted">
      <h2>Completed Todo</h2>
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">Todo</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="todoComplete in todosComplete" class="table-light">
            <td><strike><i class="fas fa-check"></i>{{todoComplete.name}}</strike></td>
            <td>
              <a href="#" @click="deleteTodo(todoComplete._id)">Delete</a>
              <br> <br>
              <a href="#" @click="uncompleteTodo(todoComplete._id)">Uncomplete</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <h4 v-if="todosComplete.length <= 0 && showTodosCompleted" > No Complete Todos </h4>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
  name: 'ViewPort',
  data () {
    return {
      showTodosComplete: false,
      time: null,
      name: null
    }
  },
  computed: {
    ...mapState([
      'todosUncomplete',
      'todosComplete',
      'isEdit',
      'isDelete',
      'showTodosCompleted'
    ])
  },
  methods: {
    ...mapMutations([
      'showTodoEdit',
      'hideTodoEdit',
      'showTodoEditReminder',
      'hideTodoEditReminder'
    ]),
    ...mapActions([
      'deleteTodo',
      'editTodo',
      'uncompleteTodo',
      'completeTodo'
    ]),
    showPopReminder () {
      this.popReminder = !this.popReminder
    },
    setReminder (id) {
      let payload = {
        _id: id,
        name: this.name,
        reminder: this.time
      }
      this.editTodo(payload)
      this.name = null
      this.reminder = null
    },
    changeName (id) {
      let payload = {
        _id: id,
        name: this.name
      }
      this.editTodo(payload)
      this.name = null
    }
  }
}
</script>

<style lang="css">
</style>
