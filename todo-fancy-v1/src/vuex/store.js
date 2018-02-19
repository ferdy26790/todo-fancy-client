import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'
const http = axios.create({
  baseURL: 'http://localhost:3000/api/'
})

Vue.use(Vuex)

const state = {
  user: null,
  signin: false,
  todosUncomplete: [],
  todosComplete: [],
  isEdit: false,
  isDelete: false,
  showTodosCompleted: false
}

const mutations = {
  fetchUser (state, payload) {
    console.log(payload)
    state.user = payload
    console.log(state.user)
    state.signin = true
    router.push('/home')
  },
  logout (state) {
    state.user = null
    state.signin = false
    localStorage.removeItem('token')
    router.push('/')
  },
  fetchTodos (state, payload) {
    state.todosUncomplete = payload.todosUncomplete
    state.todosComplete = payload.todosComplete
  },
  addTodo (state, payload) {
    payload.isEdit = false
    payload.isEditReminder = false
    state.todosUncomplete.push(payload)
  },
  addTodoComplete (state, payload) {
    state.todosComplete.push(payload)
  },
  deleteTodo (state, payload) {
    state.todosUncomplete.forEach((todo, idx) => {
      if (todo._id === payload) {
        state.todosUncomplete.splice(idx, 1)
      }
    })
    // state.todosComplete.forEach((todo, idx) => {
    //   if (todo._id === payload) {
    //     state.todosComplete.splice(idx, 1)
    //   }
    // })
  },
  deleteTodoComplete (state, payload) {
    state.todosComplete.forEach((todo, idx) => {
      if (todo._id === payload) {
        state.todosComplete.splice(idx, 1)
      }
    })
  },
  updateTodo (state, payload) {
    payload.isEdit = false
    payload.isEditReminder = false
    state.todosUncomplete.forEach((todo, idx) => {
      if (todo._id == payload._id) {
        state.todosUncomplete.splice(idx, 1, payload)
      }
    })
    console.log(state.todosUncomplete)
  },
  showTodosComplete (state) {
    state.showTodosCompleted = !state.showTodosCompleted
  },
  showTodoEdit (state, payload) {
    state.todosUncomplete.forEach((todo) => {
      if (todo._id == payload) {
        todo.isEdit = true
        console.log(todo)
      }
    })
  },
  showTodoEditReminder (state, payload) {
    state.todosUncomplete.forEach((todo) => {
      if (todo._id == payload) {
        todo.isEditReminder = true
        console.log(todo)
      }
    })
  },
  hideTodoEdit (state, payload) {
    state.todosUncomplete.forEach((todo) => {
      if (todo._id == payload) {
        todo.isEdit = false
        console.log(todo)
      }
    })
  },
  hideTodoEditReminder (state, payload) {
    state.todosUncomplete.forEach((todo) => {
      if (todo._id == payload) {
        todo.isEditReminder = false
        console.log(todo)
      }
    })
  },
  showEdit (state) {
    if (state.isDelete) {
      state.isDelete = false
      state.isEdit = !state.isEdit
    } else {
      state.isEdit = !state.isEdit
    }
  },
  showDelete (state) {
    if (state.isEdit) {
      state.isEdit = false
      state.isDelete = !state.isDelete
    } else {
      state.isDelete = !state.isDelete
    }
  }
}

const actions = {
  signIn ({commit}, payload) {
    http.post('signin', {
      email: payload.email,
      password: payload.password
    }).then((response) => {
      console.log(response.data.user)
      if (response.data.msg) {
        alert(response.data.msg)
      } else {
        localStorage.setItem('token', response.data.token)
        let user = {
          name: response.data.user.name,
          id: response.data.user.id
        }
        commit('fetchUser', user)
      }
    }).catch((err) => {
      alert(err.response.data.msg)
    })
  },
  getTodo ({commit}) {
    http.get('todo', {
      headers: {
        token: localStorage.getItem('token')
      }
    }).then((response) => {
      response.data.todo.forEach((todo, idx) => {
        todo.isEditReminder = false
        todo.isEdit = false
        if (todo.reminder) {
          let reminder = new Date(todo.reminder)
          let day = reminder.getDate()
          let month = reminder.getMonth() + 1
          if (month.toString().length == 1) {
            month = '0'+ month
          }
          let year = reminder.getFullYear()
          let newReminder = day + '-' + month + '-' + year
          todo.reminder = newReminder
          // response.data.todo.splice(idx, 1, newReminder)
        }
      })
      let todos = response.data.todo
      let todosUncomplete = []
      let todosComplete = []
      todos.map((todo, idx) => {
        if (todo.status == 'complete') {
          todosComplete.push(todo)
        } else {
          todosUncomplete.push(todo)
        }
      })
      let payload = {
        todosUncomplete: todosUncomplete,
        todosComplete: todosComplete
      }
      commit('fetchTodos', payload)
    }).catch((err) => {
      console.error(err)
    })
  },
  addTodo ({commit}, payload) {
    http.post('todo', {
      name: payload
    }, {
      headers: {
        token: localStorage.getItem('token')
      }
    }).then((response) => {
      console.log(response.data.todo)
      commit('addTodo', response.data.todo)
    }).catch((err) => {
      console.error(err)
    })
  },
  deleteTodo ({commit}, payload) {
    http.delete(`todo/${payload}`, {
      headers: {
        token: localStorage.getItem('token')
      }
    }).then((response) => {
      console.log(response.data.todo._id)
      if (response.data.todo.status == 'complete') {
        commit('deleteTodoComplete', response.data.todo._id)
      } else {
        commit('deleteTodo', response.data.todo._id)
      }
    }).catch((err) => {
      console.log(err)
    })
  },
  editTodo ({commit}, payload) {
    console.log('masuk');
    http.put(`todo/${payload._id}`,
    {
      name: payload.name,
      reminder: payload.reminder
    },
    {
      headers: {
        token: localStorage.getItem('token')
      }
    }).then((response) => {
      let todo = response.data.todo
      if (todo.reminder) {
        let reminder = new Date(todo.reminder)
        let day = reminder.getDate()
        let month = reminder.getMonth() + 1
        if (month.toString().length == 1) {
          month = '0'+ month
        }
        let year = reminder.getFullYear()
        let newReminder = day + '-' + month + '-' + year
        todo.reminder = newReminder
        commit('updateTodo', todo)
      } else {
        commit('updateTodo', todo)
      }
    }).catch((err) => {
      console.error(err)
    })
  },
  uncompleteTodo ({ commit }, payload) {
    console.log(localStorage.getItem('token'));
    http.put(`/todo/${payload}/uncomplete`, {}, {
      headers: {
        token: localStorage.getItem('token')
      }
    }).then((response) => {
      console.log(response.data.todo)
      let todo = response.data.todo
      if (todo.reminder) {
        let reminder = new Date(todo.reminder)
        let day = reminder.getDate()
        let month = reminder.getMonth() + 1
        if (month.toString().length == 1) {
          month = '0'+ month
        }
        let year = reminder.getFullYear()
        let newReminder = day + '-' + month + '-' + year
        todo.reminder = newReminder
        commit('addTodo', todo)
        commit('deleteTodoComplete', todo._id)
      } else {
        commit('addTodo', todo)
        commit('deleteTodoComplete', todo._id)
      }
    }).catch((err) => {
      console.error(err)
    })
  },
  completeTodo ({ commit }, payload) {
    http.put(`todo/${payload}/complete`, {}, {
      headers: {
        token: localStorage.getItem('token')
      }
    }).then((response) => {
      console.log(response.data.todo);
      let todo = response.data.todo
      commit('deleteTodo', todo._id)
      commit('addTodoComplete', todo)
    }).catch((err) => {
      console.error(err)
    })
  },
  signUp ({ commit }, payload) {
    http.post('signup', {
      name: payload.name,
      email: payload.email,
      password: payload.password
    })
    .then((response) => {
      confirm('register sukses silahkan login')
      router.push('/')
    }).catch((err) => {
      console.error(err.response)
      if (err.response.data.msg) {
        alert(err.response.data.msg)
      } else {
        alert(err.response.data.message)
      }
    })
  }
}

const store = new Vuex.Store({
  state,
  mutations,
  actions
})

export default store
