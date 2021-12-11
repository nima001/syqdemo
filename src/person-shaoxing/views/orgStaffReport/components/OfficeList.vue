<template>
  <div class="wrapper">
    <div class="body">
      <a-table
        :key="key"
        tableLayout="fixed"
        :columns="columns"
        :dataSource="dataSource"
        :loading="loading"
        :pagination="false"
        :defaultExpandAllRows="true"
      >
      </a-table>
    </div>
  </div>
</template>
<script>
import { Table } from "ant-design-vue";
import { chartByOrg } from "@/person-shaoxing/api/orgStaffReport";
import { showError } from "@/framework/utils";

export default {
  components: {
    ATable: Table,
  },
  props: {
    district: String,
    unittypes: Array,
    type: String,
  },
  data() {
    return {
      key: 1,
      loading: false,
      source: undefined,
      dataMap: new Map(),
      columns: [
        { title: "类别", dataIndex: "kind", width: "40%" },
        {
          title: "超（-）空（+）编数",
          customRender: this.overRender,
          width: "20%",
        },
        { title: "核定", customRender: this.render(0), width: "20%" },
        { title: "实有数", customRender: this.render(1), width: "20%" },
      ],
      dataList: {
        xz: [
          {
            kind: "党政群机关行政编制",
            key: 1,
            children: [
              {
                kind: "党政群机关行政编制（不含乡镇街道）",
                key: "dzqjgxzbz",
                columns: ["dzqjgxzbz", "dzqjgxzbz_sy"],
              },
              {
                kind: "街道",
                key: "jdxzbz",
                columns: ["jdxzbz", "jdxzbz_sy"],
              },
              {
                kind: "乡镇",
                key: "xzxzbz",
                columns: ["xzxzbz", "xzxzbz_sy"],
              },
            ],
          },
          {
            kind: "后勤服务人员",
            key: "gqbz",
            columns: ["gqbz", "gqbz_sy"],
          },
        ],
        sy: [
          {
            kind: "事业编制",
            key: "fcgsybz",
            columns: ["fcgsybz", "fcgsybz_sy"],
          },
          {
            kind: "参公编制",
            key: "czgwyfglsybz",
            columns: ["czgwyfglsybz", "czgwyfglsybz_sy"],
          },
          {
            kind: "报备员额",
            key: "bbye_bzajfxs",
            columns: ["bbye_bzajfxs", "bbye_bzajfxs_sy"],
          },
        ],
      },
    };
  },
  computed: {
    dataSource() {
      return this.dataList[this.type];
    },
  },
  watch: {
    district: {
      handler() {
        this.key = Math.random().toString(16).slice(6);
        this.getDataSource(this.district, this.unittypes);
      },
      immediate: true,
    },
    unittypes: {
      handler() {
        // defaultExpandAllRows 默认展开行只在第一次起作用，绑定key值，每次渲染key值改变重新渲染默认展开行
        this.key = Math.random().toString(16).slice(6);
        this.getDataSource(this.district, this.unittypes);
      },
      immediate: true,
    },
  },
  methods: {
    render(num) {
      return (record) => {
        if (record.children) {
          let sum = 0;
          for (let i = 0; i < record.children.length; i++) {
            sum += this.dataMap.get(record.children[i].columns[num]);
          }
          return sum;
        } else {
          return this.dataMap.get(record.columns[num]);
        }
      };
    },
    overRender(record) {
      if (record.key == 1) {
        let sum = 0;
        if (record.children.length > 0) {
          for (let i = 0; i < record.children.length; i++) {
            sum +=
              this.dataMap.get(record.children[i].columns[0]) -
              this.dataMap.get(record.children[i].columns[1]);
          }
        }
        return sum;
      } else {
        return (
          this.dataMap.get(record.columns[0]) -
          this.dataMap.get(record.columns[1])
        );
      }
    },
    getArr() {
      const arr = [];
      Object.keys(this.dataList).forEach((item) => {
        for (let i = 0; i < this.dataList[item].length; i++) {
          if (this.dataList[item][i].columns) {
            arr.push(
              this.dataList[item][i].columns[0],
              this.dataList[item][i].columns[1]
            );
          }
          if (this.dataList[item][i].children) {
            for (let j = 0; j < this.dataList[item][i].children.length; j++) {
              if (this.dataList[item][i].children[j].columns) {
                arr.push(
                  this.dataList[item][i].children[j].columns[0],
                  this.dataList[item][i].children[j].columns[1]
                );
              }
            }
          }
        }
      });
      return arr;
    },
    getDataSource(district, unittypes) {
      this.loading = true;
      let arr = this.getArr();
      arr = arr.map((item) => {
        return { code: item, name: item };
      });
      chartByOrg(district, unittypes, arr)
        .then(({ result }) => {
          this.source = result.data.rows;
          for (let i = 0; i < this.source.length; i++) {
            this.dataMap.set(this.source[i].k0, this.source[i].v);
          }
        })
        .catch((err) => {
          showError(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>
<style lang="less" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
  & > .body {
    flex: auto;
    padding: 0 @content-padding-h;
    overflow: auto;
    /deep/.ant-table-thead {
      th {
        border: 1px solid #e8e8e8;
        &:first-child {
          border-left: none;
        }
        &:last-child {
          border-right: none;
        }
      }
    }
  }
}
</style>