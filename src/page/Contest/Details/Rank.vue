<template>
  <v-card>
    <v-toolbar>
      <v-card-text class="headline">{{name}}</v-card-text>
      <v-toolbar-items>
        <v-btn text :to="'/contest/'+$route.params.id+'/dash'">Problems</v-btn>
        <v-btn text :to="'/contest/'+$route.params.id+'/submission'">My Submission</v-btn>
        <v-btn text :to="'/contest/'+$route.params.id+'/clari'">Clarification</v-btn>
        <v-btn text :to="'/contest/'+$route.params.id+'/rank'">Ranking</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="rank"
      loading-text="Loading... Please wait"
      class="elevation-1 text-center"
      :items-per-page="15"
    >
      <template v-slot:item="{ item }">
        <tr class="text-xs-center">
          <td>{{ item.Rank }}</td>
          <td>{{ item.Solved }}</td>
          <td>{{ Math.floor(item.Penalty/60/1000) }}</td>
          <td style="max-width:10em;">{{ item.Team }}</td>
          <td v-for="(a,b) in problem" :key="a" :style="get_color(item[b],first[b]===item.Team)">
            <span v-if="item[b]&&item[b][1]===2" style="color:#D33131">({{item[b][0]}})</span>
            <span v-if="item[b]&&item[b][1]===1" style="color:#441dff ">({{item[b][0]}})</span>
            <span
              v-else-if="item[b]&&item[b][1]===0"
              style="color:#41B146"
            >{{Math.floor(item[b][2]/1000/60)}}({{item[b][0]}})</span>
          </td>
        </tr>
      </template>
    </v-data-table>
  </v-card>
</template>
<script>
export default {
  mounted() {
    this.axios
      .get("v1/contest/" + String(this.$route.params.id), {
        headers: {
          Authorization: "Bearer " + this.$store.getters.Refresh_Token
        }
      })
      .then(res => {
        this.name = res.data.name;
        // this.openTime = new Date(res.data.start_at);
      });

    this.axios
      .get("v1/contest/" + String(this.$route.params.id) + "/problem-list", {
        headers: {
          Authorization: "Bearer " + this.$store.getters.Token
        }
      })
      .then(res => {
        for(var i in res.data){
          this.problem[res.data[i].title]=String.fromCharCode(Number('A'.charCodeAt(0))+Number(i));
        }
      });

    this.axios
      .get("v1/contest/" + String(this.$route.params.id) + "/submission-list", {
        params: {
          page: 1,
          "page-size": 1111111111111111
        },
        headers: {
          Authorization: "Bearer " + this.$store.getters.Refresh_Token
        }
      })
      .then(res => {
        //#TODO add data
        console.log(res.data);
      });

    for (var i in this.problem) {
      this.headers.push({
        text: this.problem[i],
        value: this.problem[i],
        sortable: false
      });
    }
    this.sort();
  },
  data() {
    return {
      openTime: new Date("2019-03-10 10:56:28.945510"),
      name: "123",
      headers: [
        { text: "Rank", value: "Rank", sortable: false },
        { text: "Solved", value: "Solved", sortable: false },
        { text: "Penalty", value: "Penalty", sortable: false },
        { text: "Team", value: "Team", sortable: false }
      ],
      rank: [],
      problem: {
        "1": "A",
        "1707": "B",
        "1708": "C",
        "1709": "D",
        "1710": "E",
        "1711": "F",
        "1712": "G",
        "1713": "H",
        "1714": "I",
        "1715": "J"
      },
      first: {},
      contest:
        '[{"status": "Compile Error", "createTime": "2019-03-10 10:56:28.945510", "team": "UESTC_Default", "problemId": 1, "teamApproved": 1}, {"status": "Compile Error", "createTime": "2019-03-10 11:00:24.800737", "team": "UESTC_Default", "problemId": 1, "teamApproved": 1}, {"status": "Accepted", "createTime": "2019-03-10 11:00:54.323469", "team": "UESTC_Default", "problemId": 1, "teamApproved": 1}, {"status": "Accepted", "createTime": "2019-03-10 11:01:16.345958", "team": "UESTC_Default", "problemId": 1, "teamApproved": 1}, {"status": "Accepted", "createTime": "2019-03-10 13:00:56.086881", "team": "pourColaOnTheJury", "problemId": 1, "teamApproved": 1}, {"status": "Compile Error", "createTime": "2019-03-10 13:01:20.262779", "team": "\u7b49\u5230\u70df\u706b\u6e05\u51c9", "problemId": 1, "teamApproved": 1}, {"status": "Accepted", "createTime": "2019-03-10 13:01:50.019108", "team": "pourColaOnTheJury", "problemId": 1707, "teamApproved": 1}, {"status": "Accepted", "createTime": "2019-03-10 13:02:07.964292", "team": "\u7b49\u5230\u70df\u706b\u6e05\u51c9", "problemId": 1, "teamApproved": 1}, {"status": "Accepted", "createTime": "2019-03-10 13:02:52.965898", "team": "pourColaOnTheJury", "problemId": 1710, "teamApproved": 1}, {"status": "Wrong Answer", "createTime": "2019-03-10 13:03:50.820637", "team": "pourColaOnTheJury", "problemId": 1711, "teamApproved": 1}, {"status": "Accepted", "createTime": "2019-03-10 13:04:23.436507", "team": "\u5355\u6311ing", "problemId": 1, "teamApproved": 1}, {"status": "Compile Error", "createTime": "2019-03-10 13:04:35.767232", "team": "hrdg\u964d\u4e34\u5230\u6211\u8eab\u8fb9", "problemId": 1, "teamApproved": 1}, {"status": "Accepted", "createTime": "2019-03-10 13:05:04.082385", "team": "hrdg\u964d\u4e34\u5230\u6211\u8eab\u8fb9", "problemId": 1, "teamApproved": 1}, {"status": "Accepted", "createTime": "2019-03-10 13:06:14.353670", "team": "hrdg\u964d\u4e34\u5230\u6211\u8eab\u8fb9", "problemId": 1, "teamApproved": 1}, {"status": "Accepted", "createTime": "2019-03-10 13:06:33.050282", "team": "ddd", "problemId": 1, "teamApproved": 1}, {"status": "Accepted", "createTime": "2019-03-10 13:08:10.881373", "team": "\u4ee3\u7801\u6572\u4e0d\u961f", "problemId": 1, "teamApproved": 1}, {"status": "Accepted", "createTime": "2019-03-10 13:08:17.374032", "team": "hahahahaahah", "problemId": 1, "teamApproved": 1}, {"status": "Wrong Answer", "createTime": "2019-03-10 13:13:10.883310", "team": "0O00OO0O00OO", "problemId": 1715, "teamApproved": 1}, {"status": "Accepted", "createTime": "2019-03-10 13:13:41.668314", "team": "pourColaOnTheJury", "problemId": 1713, "teamApproved": 1}, {"status": "Accepted", "createTime": "2019-03-10 13:14:22.859171", "team": "ZON", "problemId": 1, "teamApproved": 1}, {"status": "Accepted", "createTime": "2019-03-10 13:14:37.491928", "team": "ZON", "problemId": 1, "teamApproved": 1}, {"status": "Wrong Answer", "createTime": "2019-03-10 13:14:45.063427", "team": "0O00OO0O00OO", "problemId": 1715, "teamApproved": 1}, {"status": "Accepted", "createTime": "2019-03-10 13:21:04.518429", "team": "\u53ea\u4f1a\u7b80\u5355\u9898", "problemId": 1, "teamApproved": 1}, {"status": "Wrong Answer", "createTime": "2019-03-10 13:21:08.642602", "team": "0O00OO0O00OO", "problemId": 1715, "teamApproved": 1}, {"status": "Accepted", "createTime": "2019-03-10 13:21:13.562747", "team": "UESTC_Default", "problemId": 1712, "teamApproved": 1}, {"status": "Accepted", "createTime": "2019-03-10 13:29:18.107270", "team": "0O00OO0O00OO", "problemId": 1715, "teamApproved": 1}, {"status": "Compile Error", "createTime": "2019-03-10 13:29:29.575910", "team": "UESTC_Default", "problemId": 1, "teamApproved": 1}, {"status": "Accepted", "createTime": "2019-03-10 13:30:15.762865", "team": "0O00OO0O00OO", "problemId": 1, "teamApproved": 1}, {"status": "Accepted", "createTime": "2019-03-10 13:31:01.164472", "team": "UESTC_Default", "problemId": 1, "teamApproved": 1}, {"status": "Wrong Answer", "createTime": "2019-03-10 13:33:39.402786", "team": "pourColaOnTheJury", "problemId": 1715, "teamApproved": 1}, {"status": "Wrong Answer", "createTime": "2019-03-10 13:35:43.657134", "team": "pourColaOnTheJury", "problemId": 1715, "teamApproved": 1}, {"status": "Accepted", "createTime": "2019-03-10 13:37:00.269961", "team": "obplay", "problemId": 1, "teamApproved": 1}, {"status": "Accepted", "createTime": "2019-03-10 13:37:44.413624", "team": "\u5927\u4f6c\u4eec\u7684\u7ecf\u9a8c\u5b9d\u5b9d", "problemId": 1, "teamApproved": 1}, {"status": "Accepted", "createTime": "2019-03-10 13:37:58.917031", "team": "dsadsada", "problemId": 1, "teamApproved": 1}, {"status": "Accepted", "createTime": "2019-03-10 13:43:51.275876", "team": "0O00OO0O00OO", "problemId": 1714, "teamApproved": 1}, {"status": "Accepted", "createTime": "2019-03-10 13:51:21.890103", "team": "CCDV_Fans_Club", "problemId": 1, "teamApproved": 1}, {"status": "Accepted", "createTime": "2019-03-10 13:52:26.643370", "team": "CCDV_Fans_Club", "problemId": 1710, "teamApproved": 1}, {"status": "Accepted", "createTime": "2019-03-10 13:52:49.530634", "team": "CCDV_Fans_Club", "problemId": 1711, "teamApproved": 1}, {"status": "Accepted", "createTime": "2019-03-10 13:59:03.480876", "team": "CCDV_Fans_Club", "problemId": 1713, "teamApproved": 1}, {"status": "Wrong Answer", "createTime": "2019-03-10 14:00:43.533530", "team": "0O00OO0O00OO", "problemId": 1713, "teamApproved": 1}, {"status": "Wrong Answer", "createTime": "2019-03-10 14:02:00.295043", "team": "0O00OO0O00OO", "problemId": 1713, "teamApproved": 1}, {"status": "Accepted", "createTime": "2019-03-10 14:06:37.174172", "team": "0O00OO0O00OO", "problemId": 1713, "teamApproved": 1}, {"status": "Wrong Answer", "createTime": "2019-03-10 14:11:15.524494", "team": "UESTC_Default", "problemId": 1, "teamApproved": 1}, {"status": "Accepted", "createTime": "2019-03-10 14:14:33.287555", "team": "\u7b49\u5230\u70df\u706b\u6e05\u51c9", "problemId": 1713, "teamApproved": 1}, {"status": "Wrong Answer", "createTime": "2019-03-10 14:21:33.696484", "team": "\u9664\u4e86\u521b\u5efa\u961f\u4f0d\u4e4b\u5916\u4ec0\u4e48\u90fd\u4e0d\u4f1a\u7684\u83dc\u9e21\u8fd9\u4e2a\u961f\u4f0d\u540d\u5230\u5e95\u80fd\u653e\u591a\u5c11\u4e2a\u5b57\u554a", "problemId": 1, "teamApproved": 1}, {"status": "Accepted", "createTime": "2019-03-10 14:22:10.704462", "team": "\u9664\u4e86\u521b\u5efa\u961f\u4f0d\u4e4b\u5916\u4ec0\u4e48\u90fd\u4e0d\u4f1a\u7684\u83dc\u9e21\u8fd9\u4e2a\u961f\u4f0d\u540d\u5230\u5e95\u80fd\u653e\u591a\u5c11\u4e2a\u5b57\u554a", "problemId": 1, "teamApproved": 1}, {"status": "Accepted", "createTime": "2019-03-10 14:22:40.988803", "team": "7____24", "problemId": 1, "teamApproved": 1}, {"status": "Accepted", "createTime": "2019-03-10 14:23:07.988002", "team": "\u4f60\u4eec\u4e3a\u4ec0\u4e48\u8fd9\u4e48\u719f\u7ec3\u554a\uff01", "problemId": 1, "teamApproved": 1}, {"status": "Time Limit Exceeded", "createTime": "2019-03-10 14:30:17.515342", "team": "dsadsada", "problemId": 1, "teamApproved": 1}, {"status": "Wrong Answer", "createTime": "2019-03-10 14:32:24.803424", "team": "CCDV_Fans_Club", "problemId": 1708, "teamApproved": 1}, {"status": "Accepted", "createTime": "2019-03-10 14:33:33.551387", "team": "\u4ee3\u7801\u6572\u4e0d\u961f", "problemId": 1, "teamApproved": 1}, {"status": "Wrong Answer", "createTime": "2019-03-10 14:34:34.771401", "team": "CCDV_Fans_Club", "problemId": 1708, "teamApproved": 1}, {"status": "Wrong Answer", "createTime": "2019-03-10 14:35:44.833946", "team": "CCDV_Fans_Club", "problemId": 1708, "teamApproved": 1}, {"status": "Memory Limit Exceeded", "createTime": "2019-03-10 14:36:56.036768", "team": "CCDV_Fans_Club", "problemId": 1708, "teamApproved": 1}, {"status": "Wrong Answer", "createTime": "2019-03-10 14:39:05.053864", "team": "CCDV_Fans_Club", "problemId": 1708, "teamApproved": 1}, {"status": "Time Limit Exceeded", "createTime": "2019-03-10 14:40:05.949868", "team": "\u7b49\u5230\u70df\u706b\u6e05\u51c9", "problemId": 1710, "teamApproved": 1}, {"status": "Accepted", "createTime": "2019-03-10 14:41:12.410383", "team": "pourColaOnTheJury", "problemId": 1713, "teamApproved": 1}, {"status": "Wrong Answer", "createTime": "2019-03-10 14:43:02.723571", "team": "hrdg\u964d\u4e34\u5230\u6211\u8eab\u8fb9", "problemId": 1708, "teamApproved": 1}, {"status": "Accepted", "createTime": "2019-03-10 14:44:47.227303", "team": "CCDV_Fans_Club", "problemId": 1708, "teamApproved": 1}, {"status": "Wrong Answer", "createTime": "2019-03-10 14:45:07.981494", "team": "ZON", "problemId": 1713, "teamApproved": 1}, {"status": "Accepted", "createTime": "2019-03-10 14:48:55.439868", "team": "CCDV_Fans_Club", "problemId": 1709, "teamApproved": 1}, {"status": "Time Limit Exceeded", "createTime": "2019-03-10 14:49:09.863250", "team": "\u7b49\u5230\u70df\u706b\u6e05\u51c9", "problemId": 1710, "teamApproved": 1}, {"status": "Wrong Answer", "createTime": "2019-03-10 14:54:12.606023", "team": "\u5355\u6311ing", "problemId": 1713, "teamApproved": 1}, {"status": "Wrong Answer", "createTime": "2019-03-10 14:58:35.103580", "team": "\u5355\u6311ing", "problemId": 1713, "teamApproved": 1}, {"status": "Wrong Answer", "createTime": "2019-03-10 15:01:21.773681", "team": "CCDV_Fans_Club", "problemId": 1715, "teamApproved": 1}, {"status": "Wrong Answer", "createTime": "2019-03-10 15:04:27.974794", "team": "hrdg\u964d\u4e34\u5230\u6211\u8eab\u8fb9", "problemId": 1713, "teamApproved": 1}, {"status": "Wrong Answer", "createTime": "2019-03-10 15:06:15.332147", "team": "hrdg\u964d\u4e34\u5230\u6211\u8eab\u8fb9", "problemId": 1713, "teamApproved": 1}, {"status": "Wrong Answer", "createTime": "2019-03-10 15:09:04.938457", "team": "\u7b49\u5230\u70df\u706b\u6e05\u51c9", "problemId": 1710, "teamApproved": 1}, {"status": "Wrong Answer", "createTime": "2019-03-10 15:10:17.151558", "team": "CCDV_Fans_Club", "problemId": 1715, "teamApproved": 1}, {"status": "Wrong Answer", "createTime": "2019-03-10 15:11:00.082454", "team": "CCDV_Fans_Club", "problemId": 1715, "teamApproved": 1}, {"status": "Wrong Answer", "createTime": "2019-03-10 15:13:19.828316", "team": "CCDV_Fans_Club", "problemId": 1715, "teamApproved": 1}, {"status": "Wrong Answer", "createTime": "2019-03-10 15:16:13.576101", "team": "CCDV_Fans_Club", "problemId": 1715, "teamApproved": 1}, {"status": "Wrong Answer", "createTime": "2019-03-10 15:18:03.522087", "team": "hrdg\u964d\u4e34\u5230\u6211\u8eab\u8fb9", "problemId": 1, "teamApproved": 1}, {"status": "Wrong Answer", "createTime": "2019-03-10 15:19:02.252980", "team": "hrdg\u964d\u4e34\u5230\u6211\u8eab\u8fb9", "problemId": 1713, "teamApproved": 1}, {"status": "Accepted", "createTime": "2019-03-10 15:20:45.779586", "team": "CCDV_Fans_Club", "problemId": 1715, "teamApproved": 1}, {"status": "Wrong Answer", "createTime": "2019-03-10 15:23:15.911457", "team": "\u5355\u6311ing", "problemId": 1713, "teamApproved": 1}, {"status": "Accepted", "createTime": "2019-03-10 15:26:56.369513", "team": "hrdg\u964d\u4e34\u5230\u6211\u8eab\u8fb9", "problemId": 1713, "teamApproved": 1}, {"status": "Compile Error", "createTime": "2019-03-10 15:35:19.472868", "team": "hrdg\u964d\u4e34\u5230\u6211\u8eab\u8fb9", "problemId": 1707, "teamApproved": 1}, {"status": "Accepted", "createTime": "2019-03-10 15:42:25.070017", "team": "hrdg\u964d\u4e34\u5230\u6211\u8eab\u8fb9", "problemId": 1707, "teamApproved": 1}, {"status": "Accepted", "createTime": "2019-03-10 15:47:20.102078", "team": "CCDV_Fans_Club", "problemId": 1712, "teamApproved": 1}, {"status": "Wrong Answer", "createTime": "2019-03-10 15:50:02.497455", "team": "hahahahaahah", "problemId": 1708, "teamApproved": 1}, {"status": "Time Limit Exceeded", "createTime": "2019-03-10 15:50:10.590501", "team": "hrdg\u964d\u4e34\u5230\u6211\u8eab\u8fb9", "problemId": 1710, "teamApproved": 1}, {"status": "Wrong Answer", "createTime": "2019-03-10 15:51:24.192512", "team": "\u5355\u6311ing", "problemId": 1713, "teamApproved": 1}, {"status": "Wrong Answer", "createTime": "2019-03-10 15:52:33.512926", "team": "\u53ea\u4f1a\u7b80\u5355\u9898", "problemId": 1713, "teamApproved": 1}, {"status": "Wrong Answer", "createTime": "2019-03-10 15:54:16.109752", "team": "\u5927\u4f6c\u4eec\u7684\u7ecf\u9a8c\u5b9d\u5b9d", "problemId": 1713, "teamApproved": 1}, {"status": "Wrong Answer", "createTime": "2019-03-10 15:56:29.557657", "team": "\u53ea\u4f1a\u7b80\u5355\u9898", "problemId": 1713, "teamApproved": 1}, {"status": "Wrong Answer", "createTime": "2019-03-10 15:57:31.166423", "team": "\u5927\u4f6c\u4eec\u7684\u7ecf\u9a8c\u5b9d\u5b9d", "problemId": 1713, "teamApproved": 1}, {"status": "Accepted", "createTime": "2019-03-10 15:58:08.824512", "team": "hahahahaahah", "problemId": 1707, "teamApproved": 1}, {"status": "Wrong Answer", "createTime": "2019-03-10 16:00:39.973682", "team": "ZON", "problemId": 1713, "teamApproved": 1}, {"status": "Wrong Answer", "createTime": "2019-03-10 16:00:58.643669", "team": "\u5927\u4f6c\u4eec\u7684\u7ecf\u9a8c\u5b9d\u5b9d", "problemId": 1713, "teamApproved": 1}, {"status": "Wrong Answer", "createTime": "2019-03-10 16:03:17.616473", "team": "\u53ea\u4f1a\u7b80\u5355\u9898", "problemId": 1713, "teamApproved": 1}, {"status": "Accepted", "createTime": "2019-03-10 16:07:24.714201", "team": "ZON", "problemId": 1713, "teamApproved": 1}, {"status": "Time Limit Exceeded", "createTime": "2019-03-10 16:08:00.307171", "team": "\u5355\u6311ing", "problemId": 1715, "teamApproved": 1}, {"status": "Wrong Answer", "createTime": "2019-03-10 16:08:12.826067", "team": "hahahahaahah", "problemId": 1708, "teamApproved": 1}, {"status": "Wrong Answer", "createTime": "2019-03-10 16:08:16.220822", "team": "\u53ea\u4f1a\u7b80\u5355\u9898", "problemId": 1713, "teamApproved": 1}, {"status": "Accepted", "createTime": "2019-03-10 16:09:35.684580", "team": "pourColaOnTheJury", "problemId": 1, "teamApproved": 1}, {"status": "Compile Error", "createTime": "2019-03-10 16:11:28.234681", "team": "CCDV_Fans_Club", "problemId": 1714, "teamApproved": 1}, {"status": "Accepted", "createTime": "2019-03-10 16:11:37.831591", "team": "CCDV_Fans_Club", "problemId": 1714, "teamApproved": 1}, {"status": "Time Limit Exceeded", "createTime": "2019-03-10 16:14:29.902784", "team": "hrdg\u964d\u4e34\u5230\u6211\u8eab\u8fb9", "problemId": 1715, "teamApproved": 1}, {"status": "Wrong Answer", "createTime": "2019-03-10 16:16:16.481922", "team": "hrdg\u964d\u4e34\u5230\u6211\u8eab\u8fb9", "problemId": 1715, "teamApproved": 1}, {"status": "Wrong Answer", "createTime": "2019-03-10 16:17:48.909439", "team": "\u5927\u4f6c\u4eec\u7684\u7ecf\u9a8c\u5b9d\u5b9d", "problemId": 1713, "teamApproved": 1}, {"status": "Wrong Answer", "createTime": "2019-03-10 16:19:56.298920", "team": "\u53ea\u4f1a\u7b80\u5355\u9898", "problemId": 1, "teamApproved": 1}, {"status": "Wrong Answer", "createTime": "2019-03-10 16:20:25.961482", "team": "\u53ea\u4f1a\u7b80\u5355\u9898", "problemId": 1713, "teamApproved": 1}, {"status": "Time Limit Exceeded", "createTime": "2019-03-10 16:30:20.602296", "team": "hrdg\u964d\u4e34\u5230\u6211\u8eab\u8fb9", "problemId": 1710, "teamApproved": 1}, {"status": "Wrong Answer", "createTime": "2019-03-10 16:42:57.418825", "team": "hahahahaahah", "problemId": 1710, "teamApproved": 1}, {"status": "Compile Error", "createTime": "2019-03-10 16:43:32.924375", "team": "\u5e26\u5e26acm", "problemId": 1, "teamApproved": 1}, {"status": "Accepted", "createTime": "2019-03-10 16:43:53.458973", "team": "\u5e26\u5e26acm", "problemId": 1, "teamApproved": 1}, {"status": "Wrong Answer", "createTime": "2019-03-10 16:46:56.911986", "team": "\u53ea\u4f1a\u7b80\u5355\u9898", "problemId": 1713, "teamApproved": 1}, {"status": "Wrong Answer", "createTime": "2019-03-10 16:50:10.303169", "team": "\u53ea\u4f1a\u7b80\u5355\u9898", "problemId": 1713, "teamApproved": 1}, {"status": "Accepted", "createTime": "2019-03-10 16:52:42.000620", "team": "\u4ee3\u7801\u6572\u4e0d\u961f", "problemId": 1, "teamApproved": 1}, {"status": "Wrong Answer", "createTime": "2019-03-10 16:53:14.982487", "team": "\u53ea\u4f1a\u7b80\u5355\u9898", "problemId": 1713, "teamApproved": 1}, {"status": "Wrong Answer", "createTime": "2019-03-10 16:55:32.970131", "team": "hrdg\u964d\u4e34\u5230\u6211\u8eab\u8fb9", "problemId": 1715, "teamApproved": 1}, {"status": "Accepted", "createTime": "2019-03-10 16:58:41.428992", "team": "ZON", "problemId": 1715, "teamApproved": 1}, {"status": "Accepted", "createTime": "2019-03-10 17:04:17.431027", "team": "hrdg\u964d\u4e34\u5230\u6211\u8eab\u8fb9", "problemId": 1715, "teamApproved": 1}, {"status": "Accepted", "createTime": "2019-03-10 17:05:01.825963", "team": "CCDV_Fans_Club", "problemId": 1707, "teamApproved": 1}, {"status": "Wrong Answer", "createTime": "2019-03-10 17:07:59.434464", "team": "hrdg\u964d\u4e34\u5230\u6211\u8eab\u8fb9", "problemId": 1712, "teamApproved": 1}, {"status": "Accepted", "createTime": "2019-03-10 17:16:23.151011", "team": "hrdg\u964d\u4e34\u5230\u6211\u8eab\u8fb9", "problemId": 1712, "teamApproved": 1}, {"status": "Compile Error", "createTime": "2019-03-10 17:17:29.747573", "team": "hrdg\u964d\u4e34\u5230\u6211\u8eab\u8fb9", "problemId": 1711, "teamApproved": 1}, {"status": "Wrong Answer", "createTime": "2019-03-10 17:17:50.520926", "team": "pourColaOnTheJury", "problemId": 1711, "teamApproved": 1}, {"status": "Wrong Answer", "createTime": "2019-03-10 17:18:05.010499", "team": "pourColaOnTheJury", "problemId": 1715, "teamApproved": 1}, {"status": "Accepted", "createTime": "2019-03-10 17:22:14.847946", "team": "pourColaOnTheJury", "problemId": 1715, "teamApproved": 1}, {"status": "Wrong Answer", "createTime": "2019-03-10 17:23:31.952250", "team": "hahahahaahah", "problemId": 1713, "teamApproved": 1}, {"status": "Wrong Answer", "createTime": "2019-03-10 17:23:48.216031", "team": "hrdg\u964d\u4e34\u5230\u6211\u8eab\u8fb9", "problemId": 1711, "teamApproved": 1}, {"status": "Wrong Answer", "createTime": "2019-03-10 17:25:36.122242", "team": "hrdg\u964d\u4e34\u5230\u6211\u8eab\u8fb9", "problemId": 1711, "teamApproved": 1}, {"status": "Wrong Answer", "createTime": "2019-03-10 17:25:59.047432", "team": "\u4ee3\u7801\u6572\u4e0d\u961f", "problemId": 1707, "teamApproved": 1}, {"status": "Accepted", "createTime": "2019-03-10 17:29:20.518320", "team": "hahahahaahah", "problemId": 1713, "teamApproved": 1}, {"status": "Wrong Answer", "createTime": "2019-03-10 17:37:26.450648", "team": "\u4ee3\u7801\u6572\u4e0d\u961f", "problemId": 1707, "teamApproved": 1}, {"status": "Time Limit Exceeded", "createTime": "2019-03-10 17:43:41.598979", "team": "\u7b49\u5230\u70df\u706b\u6e05\u51c9", "problemId": 1707, "teamApproved": 1}, {"status": "Wrong Answer", "createTime": "2019-03-10 17:45:40.115670", "team": "\u4ee3\u7801\u6572\u4e0d\u961f", "problemId": 1707, "teamApproved": 1}, {"status": "Wrong Answer", "createTime": "2019-03-10 17:46:44.533492", "team": "hahahahaahah", "problemId": 1715, "teamApproved": 1}, {"status": "Accepted", "createTime": "2019-03-10 17:48:30.001606", "team": "\u7b49\u5230\u70df\u706b\u6e05\u51c9", "problemId": 1707, "teamApproved": 1}, {"status": "Runtime Error", "createTime": "2019-03-10 17:58:12.190418", "team": "\u4ee3\u7801\u6572\u4e0d\u961f", "problemId": 1848, "teamApproved": 1}, {"status": "Unknown", "createTime": "2019-03-10 17:58:47.638092", "team": "\u4ee3\u7801\u6572\u4e0d\u961f", "problemId": 1708, "teamApproved": 1}]'
    };
  },
  computed: {},
  methods: {
    sort() {
      var mp = [];
      for (var _i of JSON.parse(this.contest)) {
        if (
          _i.status === "Running" ||
          _i.status === "CE" ||
          _i.status === "Pending"
        ) {
          continue;
        }
        mp.push([
          _i.status == "Accepted" ? 0 : _i.status == "Unknown" ? 1 : 2,
          new Date(_i.createTime),
          _i.team,
          _i.problemId
        ]);
      }
      mp = mp.sort(function(a, b) {
        return a[1].getTime() - b[1].getTime();
      });
      var rank = {};
      for (var i of mp) {
        if (!rank[i[2]]) {
          rank[i[2]] = { Penalty: 0, Solved: 0, Last: 0 };
        }
        if (i[0] === 0) {
          if (!rank[i[2]][i[3]]) {
            rank[i[2]][i[3]] = [1, 0, i[1].getTime() - this.openTime.getTime()];
            rank[i[2]]["Penalty"] += i[1].getTime() - this.openTime.getTime();
            rank[i[2]]["Solved"] += 1;
            rank[i[2]]["Last"] = i[1].getTime();
            if (!this.first[i[3]]) {
              this.first[i[3]] = i[2];
            }
          } else if (rank[i[2]][i[3]][1] === 0) {
            continue;
          } else {
            rank[i[2]][i[3]][0] += 1;
            rank[i[2]][i[3]][1] = 0;
            rank[i[2]][i[3]][2] = i[1].getTime() - this.openTime.getTime();
            rank[i[2]]["Solved"] += 1;
            rank[i[2]]["Penalty"] +=
              i[1].getTime() -
              this.openTime.getTime() +
              20 * 60 * 1000 * rank[i[2]][i[3]][0];
            rank[i[2]]["Last"] = i[1].getTime();
            if (!this.first[i[3]]) {
              this.first[i[3]] = i[2];
            }
          }
        } else if (i[0] === 2) {
          if (!rank[i[2]][i[3]]) {
            rank[i[2]][i[3]] = [1, 2, 0];
          } else if (rank[i[2]][i[3]][1] === 0) {
            continue;
          } else {
            rank[i[2]][i[3]][0] += 1;
            rank[i[2]][i[3]][1] = 2;
          }
        } else {
          console.log(rank[i[2]][i[3]], rank[i[2]][i[3]]);
          if (!rank[i[2]][i[3]]) {
            rank[i[2]][i[3]] = [1, 1, 0];
          } else if (rank[i[2]][i[3]][1] === 0) {
            continue;
          } else {
            rank[i[2]][i[3]][0] += 1;
            rank[i[2]][i[3]][1] = 1;
          }
        }
      }
      var arr = [];
      for (var key in rank) {
        let jb = rank[key];
        jb["Team"] = key;
        arr.push(jb);
      }
      arr.sort(function(a, b) {
        if (a.Solved != b.Solved) {
          return b.Solved - a.Solved;
        } else if (a.Penalty != b.Penalty) {
          return b.Penalty - a.Penalty;
        } else {
          return b.Last - a.Last;
        }
      });
      for (var j = 0; j < arr.length; j += 1) {
        arr[j]["Rank"] = j + 1;
      }
      this.rank = arr;
      console.log(arr);
    },
    get_color(arr, fb) {
      if (arr) {
        if (arr[1] === 0) {
          if (fb) {
            return "background:#b0ffb0;";
          } else {
            return "background:#e0ffe0;";
          }
        } else if (arr[1] === 2) {
          return "background:#ffd0d0;";
        } else {
          console.log("blue");
          return "background:#E8E8FF;";
        }
      } else {
        return "";
      }
    }
  }
};
</script>