<template>
  <v-container>
    <v-card style="margin-bottom:3em;">
      <v-card-text class="headlines">
        <h1>Details</h1>
      </v-card-text>
      <v-divider />
      <v-card-text>
        <tr>
          <td style="width:20%">CreatedAt:</td>
          <td>{{data.create_at}}</td>
        </tr>
        <tr>
          <td style="width:20%">Description:</td>
          <td>{{data.description}}</td>
        </tr>
        <tr>
          <td style="width:20%">ID:</td>
          <td>{{data.id}}</td>
        </tr>
        <tr>
          <td style="width:20%">UpdatedAt:</td>
          <td>{{data.updated_at}}</td>
        </tr>
        <tr>
          <td style="width:20%">name:</td>
          <td>{{data.name}}</td>
        </tr>
        <tr>
          <td style="width:20%">owner:</td>
          <td>{{data.owner}}</td>
        </tr>
      </v-card-text>
      <div class="ml-4 mb-4 mt-4">
        <v-btn
          large
          color="primary"
          :to="{'name': 'EditClass', params: {'id': data.id}}"
          v-if="(this.$store.getters.IsStaff)||(this.$store.getters.uid==data.owner_id)"
        >
          <v-icon left>mdi-github-circle</v-icon>Edit
        </v-btn>

        <v-btn
          large
          color="primary"
          :to="{'name': 'ClassAddMember', params: {'id': data.id}}"
          v-if="(this.$store.getters.IsStaff)||(this.$store.getters.uid==data.owner_id)"
        >
          <v-icon left>mdi-github-circle</v-icon>Add Members
        </v-btn>
      </div>
    </v-card>
    <v-card>
      <v-card-text class="headlines">
        <h1>Members</h1>
      </v-card-text>
      <v-divider />
      <v-row v-for="i in member" :key="i.id">
        <v-card-text>{{i}}</v-card-text>
      </v-row>
      <div class="text-xs-center pt-2">
        <v-pagination v-model="page" :length="maxlen"></v-pagination>
      </div>
    </v-card>
  </v-container>
</template>

<script>
export default {
  watch: {
    page: {
      handler(val, oldVal) {
        this.axios
          .get(
            "v1/sugar/class/group/" +
              String(this.$route.params.id) +
              "/user-list?page-size=20&page=" +
              String(this.page),
            {
              headers: {
                Authorization: "Bearer " + this.$store.getters.Token
              }
            }
          )
          .then(res => {
            console.log(res.data);
            this.member = res.data.users;
          });
      },
      immediate: true
    }
  },
  created() {
    this.axios
      .get("v1/sugar/class/group/" + String(this.$route.params.id), {
        headers: {
          Authorization: "Bearer " + this.$store.getters.Token
        }
      })
      .then(res => {
        console.log(res.data);
        this.data = res.data;
      });
  },
  data() {
    return {
      data: [],
      member: [],
      page: 1,
      maxlen: 10
    };
  },
  computed: {},
  methods: {}
};
</script>