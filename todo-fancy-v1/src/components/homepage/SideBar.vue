<template>
  <div class="col-md-3 left">
    <div class="card mb-3">
      <h3 class="card-header">Welcome {{user.name}}</h3>
      <div class="card-body">
      </div>
      <div class="list-group">
        <a href="#" @click="pop" type="button" data-toggle="modal" data-target="#modal" class="list-group-item list-group-item-action">
          Add Todo
        </a>

        <div v-if="popup" class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Add Todo</h5>
            </div>
            <div class="modal-body">
              <div class="form-group">
                <label class="col-form-label" for="inputDefault">Task</label>
                <input type="text" v-model="taskName" class="form-control" placeholder="enter your task...">
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" @click="addTask()" class="btn btn-primary">Add</button>
              <button type="button" class="btn btn-secondary" @click="cancel">Cancel</button>
            </div>
          </div>
        </div>

        <a href="#" @click="showEdit" class="list-group-item list-group-item-action">Edit Todo
        </a>
        <a href="#" @click="showDelete" class="list-group-item list-group-item-action">Delete Todo
        </a>
        <a href="#" @click="showTodosComplete" class="list-group-item list-group-item-action">My Completed Todo
        </a>
      </div>
      <div class="card-body">
        <button type="button" @click="logout" class="btn btn-secondary">Logout</button>
      </div>
      <div class="card-footer text-muted">
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  name: 'SideBar',
  data () {
    return {
      popup: false,
      taskName: null
    }
  },
  computed: {
    ...mapState([
      'user',
      'signin',
      'isEdit',
      'isDelete'
    ])
  },
  methods: {
    ...mapMutations([
      'logout',
      'showEdit',
      'showDelete',
      'showTodosComplete'
    ]),
    ...mapActions([
      'addTodo'
    ]),
    pop () {
      this.popup = !this.popup
    },
    cancel () {
      this.popup = false
    },
    addTask () {
      this.addTodo(this.taskName)
      this.taskName = null
    }
  }
}
</script>

<style lang="css">
</style>
