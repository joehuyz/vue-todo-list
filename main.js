Vue.component('to-do-list',{
  template: `
    <div class="to-do-list">
      <div class="container">

        <div class="priority">
          <span>優先度：</span>
          <span>
            <input type="radio" id="normal" value="1" @click="clickFocus" v-model="priority">
            <div class="priority-radio-box bgGreen"></div>
            <label for="normal"> 普通</label>
          </span>
          <span>
            <input type="radio" id="important" value="11" @click="clickFocus" v-model="priority">
            <div class="priority-radio-box bgYellow"></div>
            <label for="important"> 重要</label>
          </span>
          <span>
            <input type="radio" id="urgent" value="111" @click="clickFocus" v-model="priority">
            <div class="priority-radio-box bgRed"></div>
            <label for="urgent"> 緊急</label>
          </span>
        </div>

        <div>
          <input id="to-do-content" class="to-do-input input-content" placeholder="新增待辦事項..." type="text" @keyup.enter="add" v-model.trim="content">
          <button class="button to-do-input-button" @click="add">送出</button>
        </div>

        <div class="sort-area">
          <button class="button" @click="sortListByPriority">依優先度排序</button>
          <button class="button" @click="sortListByDate">依日期排序</button>
        </div>


        <div>
          <ul class="to-do-list-style">
            <li class="to-do-list-item flex"
                v-for="(todoList, index) in todoLists"
                :key="todoList.todoId">

              <div class="flex-item">
                <div  class="priority-box" 
                      :class="[{ bgGreen: checkThePriority(index) === '1'},
                              { bgYellow: checkThePriority(index) === '11'},
                              { bgRed: checkThePriority(index) === '111'}]">
                </div>
                <span>{{ todoList.content }}</span>
              </div>

              <div class="flex-item edit-area">
                <span>
                  <button class="button" @click="editTheItem(index)" v-show="todoList.editShow"> <i class="far fa-edit"></i> </button>
                  <input class="to-do-input" type="text" @keyup.enter="editSubmit(index)" v-show="!todoList.editShow" v-model.trim="todoList.content">
                  <button class="button" @click="editSubmit(index)" v-show="!todoList.editShow"> <i class="far fa-edit"></i> </button>
                  <button class="button" @click="deleteTheItem(index)"><i class="far fa-trash-alt"></i></button>
                  <span class="date-area"> {{ showMonth(todoList.itemDate) + '/' + showDate(todoList.itemDate) }}</span>
                </span>
              </div>
            </li>
          </ul>
        </div>

        <div>
          <button class="button" @click="deleteAll">刪除全部</button>
        </div>
      </div>
    </div>
  `,
  data() {
    return {
      content: null,
      priority: '1',
      todoLists: JSON.parse(localStorage.todoLists || '[]'),
      todoId: '',
      selectTodoItem: 0,
      editShow: true,
      itemDate: null,
    }
  },
  methods: {
    add() {
      if (this.content && this.priority) {
        let todoItem = {
          content: this.content,
          priority: this.priority,
          todoId: this.idGenerator(),
          editShow: this.editShow,
          itemDate: Date.now(),
        };
        this.todoLists.push(todoItem);
        this.content = null;
        this.priority = '1';
      }
    },
    clickFocus() {
      document.getElementById('to-do-content').focus();
    },
    idGenerator() {
      var id = '';
      for (var i = 0; i < 10; i++) {
        id += ( 'abcdefghijklmnopqrstuvwxyz0123456789'.split('')[Math.floor(Math.random() * 36)]);
      }
      return id ;
    },
    deleteTheItem(index) {
      this.todoLists.splice(index, 1);
    },
    editTheItem(index) {
      this.todoLists[index].editShow = false;
    },
    editSubmit(index) {
      this.todoLists[index].editShow = true;
      localStorage.todoLists = JSON.stringify(this.todoLists);
    },
    checkThePriority (index) {
      if (this.todoLists[index].priority == 1) {
        return '1';
      } else if (this.todoLists[index].priority == 11) {
        return '11';
      } else if (this.todoLists[index].priority == 111) {
        return '111';
      }
    },
    sortListByPriority () {
      this.todoLists.sort(function(a, b) {
        return b.priority - a.priority;
      })
    },
    sortListByDate () {
      this.todoLists.sort(function(a, b) {
        return a.itemDate - b.itemDate;
      })
    },
    showMonth (date) {
      return new Date(date).getMonth() + 1;
    },
    showDate (date) {
      return new Date(date).getDate();
    },
    deleteAll () {
      if(confirm("確定要刪除全部嗎？")) {
        this.todoLists = [];
      }
    }
  },
  computed: {
  },
  watch: {
    todoLists: function() {
      localStorage.todoLists = JSON.stringify(this.todoLists);
    }
  }
});


var app = new Vue({
  el: '#todoapp',
  data: {
    todoTitle: 'To-Do List'
  }
});