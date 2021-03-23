<template>
  <div id="outer">
    <div id="cards">
      <div class="card1">
        <h1 class="title">Task List</h1>
        <div class="contents">
          <input type="text" placeholder="What should your do?"  v-model="task_form"/>
          <button id="add" @click="post()">add</button>
        </div>
      </div>
      <div class="card2">
        <h3>Your task Lists!</h3>
        <div class="flex">
          <div>
            <div v-for="(item, id) of tasks" :key="`first-${id}`">
              <p class="id">{{ id + 1 }}.</p>
              <input class="taskContents" v-model="item.task"/>
              <button id="update"  @click="put(item)">Update</button>
              <button id="del" @click="del(item)">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  props:{
    id: Number,
    item: String,
    task:String
  },
  data() {
    return {
      tasks: {
        id:"",
        task:""
      },
      task_form: "",
      active: true,
    };
  },
  methods: {
    post() {
      if (this.task_form === "") {
        alert("Please enter the contents.");
      } else {
        axios
          .post("https://glacial-lake-80001.herokuapp.com/api/tasks", {
            id: this.$store.state.id,
            task: this.task_form,
          })
          .then((res) => {
            console.log(JSON.stringify(res));
            alert("Posted successfully.");
            this.task = "";
            this.get()
            this.$router.go({
              path: this.$router.currentRoute.path,
              force: true,
            });
          });
      }
    },
    
    put(item) {

      axios.put("https://glacial-lake-80001.herokuapp.com/api/tasks/" + item.id, {task: item.task}
      )
      alert("Updated successfully")
    },

    del(item) {
      axios.delete(
        'https://glacial-lake-80001.herokuapp.com/api/tasks/' +
        item.id, {
          id: this.id
        }
      )
      .then((res) => {
        console.log(JSON.stringify(res));
        alert("Deleted successfully");
        this.tasks = res.data.data
      });
    },


    get() {
      axios
      .get("https://glacial-lake-80001.herokuapp.com/api/tasks", {
        id: this.$store.state.id,
      })
      .then((result) => {
        this.tasks = result.data.data
      })
      
    }    
  },
  mounted: function() {
    this.get()
  },
}

</script>
<style scoped>

#outer {
  width: 100%;
  height: 100%;
}

#cards {
display: flex;
}

.card1 {
  width: 65%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color:  #1d3781 ;
  padding: 20px;
}

.title {
  color: aliceblue;
}

.contents {
  display: flex;
  justify-content: flex-start;
}

.card1 input {
  width: 50%;
  height: 40px;
  border-radius: 5px;
  border: 1px solid #081535;
  background: whitesmoke;
}

#add {
  width: 50px;
  text-align: center;
  padding: 10px 0;
  color: #081535;
  background-color: whitesmoke;
  border-radius: 5px;
  border: 1px solid #081535;
  margin: 0 60px;
}

.card2 {
  width: 65%;
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%, 0);
  background-color: gray;
  padding: 20px;
}

.flex {
  display: flex;
  margin: 10px;
  width: 100%;
}

.id {
  padding: 5px 10px;
}

.taskContents {
  padding: 0 5px;
  height: 40px;
  width: 100%;
  border-radius: 5px;
  border: 1px solid black;
  background: whitesmoke;
}

#update {
  margin: 0 5px;
  border-radius: 5px;
  border: 2px solid blue;
  background: whitesmoke;
  color: blue;
}

#del {
  border-radius: 5px;
  border: 2px solid red;
  background: whitesmoke;
  color: red;
}
</style>