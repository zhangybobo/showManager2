<template>
<el-card>
    <cusBread level1="权限管理" level2="权限列表" style="margin-bottom:20px"></cusBread>
    <!-- talbe表格  加上height属性就会有滚动条-->
    <el-table :data="list" style="width: 100%" height="450px">
        <!-- type="index" 是 <el-table>自带的属性 添加序列号 -->
        <el-table-column type="index" label="#" width="100"></el-table-column>
        <el-table-column prop="authName" label="角色名称" width="200"></el-table-column>
        <el-table-column prop="path" label="路径" width="200"></el-table-column>
        <el-table-column label="层级" width="200">
            <template slot-scope="scope">
                <span v-if="scope.row.level==='0'">层级一</span>
                <span v-if="scope.row.level==='1'">层级二</span>
                <span v-if="scope.row.level==='2'">层级三</span>>
            </template>
        </el-table-column>

    </el-table>
</el-card>
</template>

<script>
export default {
    data() {
        return {
            list: []
        }
    },
    created() {
        this.getTableData();
    },
    methods: {
        async getTableData() {
            // const Askheader = localStorage.getItem("token");
            // this.axios.defaults.headers.common["Authorization"] = Askheader;
            const res = await this.axios.get(`rights/list`);
            this.list = res.data.data
        },
    },
}
</script>

<style>

</style>
