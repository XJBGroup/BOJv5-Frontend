<template>
  <v-container>
    <v-card>
      <hot-table
        stretchH="all"
        :data="data"
        fillHandle="horizontal"
        :rowHeaders="true"
        :colHeaders="header"
        licenseKey="non-commercial-and-evaluation"
        :columns="[
        {data: 'username'},
        {data: 'status',readOnly: true}]"
        :comments="true"
        :renderer=" function(hotInstance, TD, row, col, prop, value) {
          TD.textContent = value;
          if (prop === 'status') {
              if (typeof value === 'undefined' || value === null || value === '')
                  TD.style.background = '#ffffff';
              else if (value === 'added')
                  TD.style.background = '#aaffaa';
              else
                  TD.style.background = '#ffaaaa';
          };
      }"
        :contextMenu="{items: {
            row_above: {
              name: '上方插入一行'
            },
            row_below: {
              name: '下方插入一行'
            },
            remove_row: {
              name: '删除行'
            },
            copy: {
              name: '复制'
            },
            cut: {
              name: '剪切'
            },
          }
        }"
        ref="table"
      ></hot-table>
      <v-row>
        <v-col>
          <v-btn large color="primary" @click="add">
            <v-icon left>mdi-book</v-icon>Add
          </v-btn>
        </v-col>
        <v-col>
          <v-btn large color="primary" @click="push">
            <v-icon left>mdi-book</v-icon>New Line
          </v-btn>
        </v-col>
        <v-col>
          <v-btn large color="primary" @click="pop">
            <v-icon left>mdi-book</v-icon>Remove Last
          </v-btn>
        </v-col>
        <v-col>
          <v-btn large color="primary" @click="shrink">
            <v-icon left>mdi-book</v-icon>Shrink To Fit
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import { HotTable } from "@handsontable/vue";
export default {
  data: function() {
    return {
      header: ["Username", "Status"],
      data: [{}]
    };
  },
  components: {
    HotTable
  },
  methods: {
    add() {
      // this.data[0]["status"] = "added";
      // this.refresh();
      console.log(this.data);
      var self = this;
      var sb = function(i) {
        self.axios
          .post(
            "v1/sugar/class/group/" +
              String(self.$route.params.id) +
              "/user/",
            "user_name=" + self.data[i].username,
            {
              headers: {
                Authorization: "Bearer " + self.$store.getters.Token
              }
            }
          )
          .then(res => {
            console.log(self.data[i]);
            if (res.data.code == 0) {
              self.data[i].status = "added";
            } else {
              self.data[i].status = "failed";
            }
            self.refresh();
          });
      };
      for (var i in this.data) {
        sb(i);
      }
    },
    refresh() {
      this.push();
      this.pop();
    },
    push() {
      this.data.push({});
    },
    pop() {
      this.data.pop();
    },
    shrink() {
      var _data = [];
      for (var i = 0; i < this.data.length; i++) {
        console.log(this.data[i]);
        if ("username" in this.data[i] && this.data[i].username != "") {
          _data.push(this.data[i]);
        }
      }
      this.data = _data;
    }
  }
};
</script>

<style src="@/../node_modules/handsontable/dist/handsontable.full.css"></style>