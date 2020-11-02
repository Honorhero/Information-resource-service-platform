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
        <!-- <el-button type="primary" icon="el-icon-plus">添加</el-button> -->
        <el-button
          type="primary"
          icon="el-icon-delete"
          @click="deleteCollectionRecord"
        >
          删除
        </el-button>
      </el-row>
      <div class="table-list">
        <el-table :data="collectionRecords" :border="true">
          <el-table-column label="选择" align="center" width="55">
            <template slot-scope="scope">
              <el-radio
                v-model="radio"
                :label="scope.$index"
                @change="getCurrentRow(scope.row)"
              ></el-radio>
            </template>
          </el-table-column>
          <el-table-column
            prop="resourceName"
            label="名称"
            align="center"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column label="类别" align="center">
            <template slot-scope="scope">
              <div>{{ scope.row.resourcesType | filterResourceType }}</div>
            </template>
          </el-table-column>
          <el-table-column label="创建时间" align="center" min-width="180">
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
  name: "UserCollectionRecord",
  components: {
    Pagination
  },
  data() {
    return {
      browseRecordName: "",
      currentPageNum: 0,
      size: 20,
      total: 0,
      radio: "",
      selectedRow: {}
    };
  },
  mounted() {
    this.getTableData();
  },
  computed: {
    ...mapGetters("user", [
      "collectionRecords",
      "collectionTotalCount",
      "deleteRecordSuccess"
    ])
  },
  watch: {
    collectionTotalCount: {
      handler(val) {
        this.total = val;
      }
    },

    deleteRecordSuccess: {
      handler(val) {
        if (val) {
          this.getTableData();
        }
      }
    }
  },
  methods: {
    getTableData() {
      this.$store.dispatch("user/getCollectionRecords", {
        keyWord: this.browseRecordName,
        skipCount: this.currentPageNum * this.size,
        maxResultCount: this.size
      });
    },

    getCurrentRow(row) {
      this.selectedRow = row;
    },

    deleteCollectionRecord() {
      if (this.radio === "") {
        this.$notify({
          title: "警告",
          type: "warning",
          message: "请先选择收藏记录再删除！"
        });
        return;
      }
      this.$confirm("此操作将删除选中的收藏记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store
            .dispatch("user/deleteCollectionRecord", {
              id: this.selectedRow.id
            })
            .then(() => {
              this.radio = "";
            });
        })
        .catch(() => {});
    }
  }
};
</script>

<style></style>
