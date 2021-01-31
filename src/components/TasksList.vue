<template>
  <div class="hello">
    <b-form-group size="sm">
      <b-container class="tasks-container">
          <b-row>
            <b-col>
              <b-alert show v-if="alert.text" :variant="alert.type" dismissible>
                <span class="text-muted">
                  {{ alert.text }}
                </span>
              </b-alert>
            </b-col>
          </b-row>
          <b-row>
            <b-col class="d-flex align-items-center">
              <b-icon-plus-square @click="addnew"></b-icon-plus-square>
              <span class="separator"></span>
              <b-form-input
                id="input-small"
                class="text-muted"
                v-model="task.content"
                size="sm"
                placeholder="Type to add new task"
                @click="visible = true"
                v-on:keyup.enter="addnew"
              ></b-form-input>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-card class="mt-2" v-if="tasks>0">
              <b-card-title><h4 class="text-muted">Tasks List:</h4></b-card-title>
              <b-card-body>
              <ul class="justify-content">
                <li class="m-2" v-for="task in tasklist" :key="task.id">
                  <b-badge :variant="getstatus(task)" :title="task.status">
                    <b-icon-x-circle
                      title="Remove task"
                      @click="removetask(task.id)"
                    ></b-icon-x-circle>
                    <span class="task" @click="setstatus(task)">
                      {{ task.content }}
                    </span>
                  </b-badge>
                </li>
              </ul>
              <b-card-footer>
                <b-button variant="light" @click="removeall">
                  <b-icon icon="x"></b-icon>
                  <span>Remove all</span>
                </b-button>
              </b-card-footer>
              </b-card-body>
              </b-card>
            </b-col>
          </b-row>
      </b-container>
    </b-form-group>
  </div>
</template>

<script>
export default {
  name: "TasksList",
  data: () => ({
    alert: {
      text: "",
      type: "",
    },
    task: {
      content: "",
      status: "open",
    },
    tasklist: [],
    visible: false,
    url: "http://localhost:5000",
  }),
  computed:{
    tasks(){
      return this.tasklist.length
    }
  },
  props: {
    //msg: String,
  },
  mounted() {
    this.getalltasks();
  },
  methods: {
    async getalltasks() {
      try {
        let res = await fetch(`${this.url}/tasks`);
        let data = await res.json();
        this.tasklist = data;
        this.alert.text = "";
      } catch (error) {
        console.log(error);
      }
    },
    async addnew() {
      if (this.task.content) {
        try {
          let config = {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(this.task),
          };
          await fetch(`${this.url}/tasks/`, config);
        } catch (error) {
          console.log(error);
        }
        this.task.content = "";
        this.getalltasks();
      } else {
        this.alert.text = "Please Type a task";
        this.alert.type = "info";
      }
    },
    async removetask(id) {
      try {
        let config = {
          method: "DELETE",
        };
        await fetch(`${this.url}/tasks/` + id, config);
      } catch (error) {
        console.log(error);
      }
      this.getalltasks();
    },
    async removeall(){
      console.log('Removing all')
      var tasks=this.tasklist
      tasks.forEach(task => {
        this.removetask(task.id)
      });
      this.getalltasks()
    },
    getstatus(task) {
      if (task.status === "open") return "info";
      if (task.status === "in progress") return "warning";
      if (task.status === "done") return "success";
      if (task.status === "block") return "danger";
    },
    async setstatus(task) {
      if (task.status === "open") {
        task.status = "in progress";
      } else if (task.status === "in progress") {
        task.status = "done";
      } else if (task.status === "done") {
        task.status = "block";
      } else if (task.status === "block") {
        task.status = "open";
      }
      try {
        let config = {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(task),
        };
        await fetch(`${this.url}/tasks/` + task.id, config);
      } catch (error) {
        console.log(error);
      }
      this.getalltasks();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.separator {
  margin-left: 0.5rem;
}
input {
  border: 0px;
}
.task {
  margin: 0.5rem;
}
.input-small {
  /*is not working */
  width: 0;
  border: "0px solid";
}
.task-container {
  margin-left: 30rems;
}
.team-member img {
  width: 1.5rem;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #7ed3e9;
}
</style>
