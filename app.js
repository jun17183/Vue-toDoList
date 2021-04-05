var vm = null;
var template = '<div v-bind:class="{checked : this.done}">' 
  + '<div v-show="!this.toggle" v-bind:class="{checked : this.done}" class="toDo_text" v-on:click="checkController()">{{toDo}}</div>'
  + '<input v-show="this.toggle" v-model="change" class="toDo_change" v-on:change="changeController()" v-on:keyup.enter="updateController()">'
  + '<button v-on:click="deleteController()">삭제</button><button v-on:click="updateController()">수정</button></div>';

$(function() {

  Vue.component('todo-item', {
    template: template,

    props: ['toDo', 'id', 'toggle', 'done'],

    data: {
      change: ''
    },

    methods: {
      deleteController: function() {
        vm.deleteController(this.id);
      },
      updateController: function() {
        console.log("component's updateController 작동");
        this.toDo = this.change;
        vm.updateController(this.id, this.toggle, this.toDo, this.done);
      },
      checkController: function() {
        console.log("component's checkController 작동");
        vm.checkController(this.id, this.toggle, this.toDo, this.done);
      }
    }
  }); 

  vm = new Vue({

    el: '#app',
    data: {
      id: 4,
      toDo: '',
      toDoList: [
        {id: 1, toDo: "청소", toggle: false, done: false},
        {id: 2, toDo: "강아지 산책", toggle: false, done: false},
        {id: 3, toDo: "Vue 공부", toggle: false, done: false},
      ]
    },
    methods: {
      insertController: function() {
        var toDo_obj = new Object();
        toDo_obj.toDo = this.toDo;
        toDo_obj.id = this.id;
        toDo_obj.toggle = false;

        this.toDoList.push(toDo_obj);
        this.toDo = '';
        this.id += 1;
      },
      deleteController: function(id) {
        this.toDoList = this.toDoList.filter( item => item.id != id );
      },  
      updateController: function(id, toggle, toDo, done) {
        var data = {id: id, toDo: toDo, toggle: !toggle, done: done}
        this.toDoList = this.toDoList.map( item => item.id==id ? {...item, ...data} : item );

        console.log(this.toDoList[id-1]);
      },
      checkController: function(id, toggle, toDo, done) {
        var data = {id: id, toDo: toDo, toggle: toggle, done: !done}
        this.toDoList = this.toDoList.map( item => item.id==id ? {...item, ...data} : item );
      }
    }
  });
});