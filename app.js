class Todo {
  constructor(title_en,title_el, done) {
    this.title_en = title_en;
    this.title_el = title_el;
    this.done = done;
  }

}//Todo class

class TodoList {
  constructor(listSelector) {
    this.list = [];
    this.$list = document.querySelector(listSelector);

    this.initialize();
    this.addEvents();
  }

  //initialize user interface
  initialize(){
    const template = `
    <div class="form-row">
        <div class="col-10">
          <div class="myInputs">
            <input
              type="text"
              class="form-control todo-entry_en"
              placeholder="Add Category English"
            />
            <input
              type="text"
              class="form-control todo-entry_el"
              placeholder="Add Category Greek"
            />
          </div>
        </div>
        <div class="col-2">
          <button
            type="submit"
            class="add-todo btn btn-primary btn-block"
          >
            Add Category
          </button>
        </div>
      </div> <div class="items"></div>`;

      this.$list.innerHTML = template;
  }

  addEvents(){
    //input elements
    this.$todoEntryEn = this.$list.querySelector(".todo-entry_en");
    this.$todoEntryEl = this.$list.querySelector(".todo-entry_el");
    //button element
    this.$todoAddBtn = this.$list.querySelector(".add-todo");
    //click listener to btn
    this.$todoAddBtn.addEventListener("click",this.handleAddTodo.bind(this));
    this.$list.addEventListener("click",this.handleToDoClick.bind(this));
  }

  handleToDoClick(e){
    const className = e.target.className;
    if(className.includes("btn-delete")){
      this.deleteToDo(e);
    }
  }//handleToDoClick

  deleteToDo(e){
    const $todo = e.target.closest(".alert");
    const idparts = $todo.id.split("-");
    const index = parseInt(idparts[1]);

    this.list.splice(index,1);
    this.renderItems();
  }

  //when btn is clicked
  handleAddTodo(e){
    const titleEn = this.$todoEntryEn.value;
    const titleEl = this.$todoEntryEl.value;
    if(titleEn && titleEl){//check if titles are empty
      if(!this.checkIfTitleExists(titleEn,titleEl)){
        const newTodo = new Todo(titleEn, titleEl,false);
        this.addTodo(newTodo);
        this.$todoEntryEn.value = "";
        this.$todoEntryEl.value = "";
      }
    }
  }

  checkIfTitleExists(newTitleEn,newTitleEl){
    var exists = false;
    const todoTemplate = this.list.map((item) => {
      const {title_en,title_el,done} = item;
      if(newTitleEn == title_en || newTitleEl == title_el){
        exists = true;
      }
    });
    return exists;
  }//checkIfTitleExists

  addTodo(todo) {
    this.list.push(todo);
    this.renderItems();
  }//addTodo

  renderItems(){
    this.$listItems = this.$list.querySelector(".items");

    const todoTemplate = this.list.map((item,i) => {
      const {title_en,title_el,done} = item;

      return `
      <div id="todo-${i}" class="alert alert-dark clearfix">
        <label class="title float-left">
          <input type="checkbox" class="done-checkbox" ${done ? "checked" : ""} />
          ${title_en+`/`+title_el}
        </label>
        <button class="btn-delete btn btn-danger float-right">x</button>
      </div>`;
    });

    this.$listItems.innerHTML = todoTemplate.join("");
  }//renderItems

}//TodoList class

//list1
const todo1 = new Todo("Hello","Γεια", false);
const todo2 = new Todo("Morning","Καλημέρα", true);
const list = new TodoList(".todo-list");
//add draft data
list.addTodo(todo1);
list.addTodo(todo2);


//list2
const todo3 = new Todo("Hello2","Γεια2", false);
const todo4 = new Todo("Morning2","Καλημέρα2", true);
const subcategoriesList = new TodoList(".todo-list2");
//add draft data
subcategoriesList.addTodo(todo3);
subcategoriesList.addTodo(todo4);
