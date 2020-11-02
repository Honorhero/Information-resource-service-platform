<template>
  <div class="user-record-wrapper">
    <div class="container">
      <el-row type="flex" justify="start">
        <div style="margin-right: 20px;">
          <el-input
            v-model="browseRecordName"
            placeholder="名称"
            style="width: 200px;"
          ></el-input>
        </div>
        <el-button type="primary" icon="el-icon-search" @click="getTableData">
          搜索
        </el-button>
      </el-row>
      <div class="table-list">
        <el-table :data="browseRecords" :border="true">
          <el-table-column
            prop="name"
            label="名称"
            align="center"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column label="时间" align="center" min-width="180">
            <template slot-scope="scope">
              <div>
                {{
                  scope.row.creationTime | convertTime("YYYY/MM/DD HH:mm:ss")
                }}
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="pg">
          <pagination
            v-if="total > 0"
            :total="total"
            :page.sync="currentPageNum"
            :limit.sync="size"
            @pagination="getTableData"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import { mapGetters } from "vuex";
export default {
  name: "UserBrowseRecord",
  components: {
    Pagination
  },
  data() {
    return {
      browseRecordName: "",
      currentPageNum: 0,
      size: 20,
      total: 0
    };
  },
  computed: {
    ...mapGetters("user", ["browseRecords", "browseTotalCount"])
  },
  watch: {
    browseTotalCount: {
      handler(val) {
        this.total = val;
      }
    }
  },
  mounted() {
    this.$store.dispatch("user/getBrowseRecords", {
      keyWord: this.browseRecordName,
      skipCount: this.currentPageNum * this.size,
      maxResultCount: this.size
    });
  },
  methods: {
    getTableData() {
      this.$store.dispatch("user/getBrowseRecords", {
        keyWord: this.browseRecordName,
        skipCount: this.currentPageNum * this.size,
        maxResultCount: this.size
      });
    }
  }
};
</script>

<style></style>
