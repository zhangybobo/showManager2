<template>
<el-card>
    <CusBread level1="用户管理" level2="用户列表"></CusBread>
    <!-- 搜索 -->
    <!-- clearable加入这个属性就可以在输入内容后删除时，末尾处会直接有个叉号删除 -->
    <!-- clear是input的方法，清除输入框的内容时自动触发的 -->
    <el-input clearable placeholder="请输入内容" v-model="query" @clear="getAllusers()" class="input-with-select" style="width:400px">
        <el-button slot="append" icon="el-icon-search" @click="searchUser()"></el-button>
    </el-input>
    <el-button type="success" plain @click="showDialogAdd()">添加用户</el-button>

    <!-- table列表 -->
    <el-table :data="list" style="width: 100%">
        <el-table-column prop="id" label="#" width="80"></el-table-column>
        <el-table-column prop="username" label="姓名" width="100"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="140"></el-table-column>
        <el-table-column prop="mobile" label="电话" width="140"></el-table-column>
        <el-table-column label="创建日期" width="200">
            <template slot-scope="scope">
                {{scope.row.create_time | fmtdat}}
            </template>
        </el-table-column>
        <el-table-column label="用户状态" width="120">
            <template slot-scope="scope">
                <!-- el-switch自带的change事件，当状态改变时自动触发 -->
                <el-switch @change="changeUserstate(scope.row)" v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949">
                </el-switch>
            </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
            <template slot-scope="scope">
                <el-button @click="showDialogeditUser(scope.row)" type="primary" icon="el-icon-edit" circle size="mini" plain></el-button>
                <el-button @click="deleUser(scope.row)" type="danger" icon="el-icon-delete" circle size="mini" plain></el-button>
                <el-button @click="showDialogChangeRole(scope.row)" type="success" icon="el-icon-check" circle size="mini" plain></el-button>
            </template>

        </el-table-column>
    </el-table>
    <!-- 分页 -->
    <!-- page-sizes控制每页显示的数据条数 -->
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagenum" :page-sizes="[2, 4, 6, 8]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
    <!-- dialog对话框添加用户 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
        <el-form label-position="left" label-width="80px" :model="formdata">
            <el-form-item label="用户名">
                <el-input v-model="formdata.username"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
                <el-input v-model="formdata.email"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="formdata.password"></el-input>
            </el-form-item>
            <el-form-item label="电话">
                <el-input v-model="formdata.mobile"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
            <el-button type="primary" @click="adduser()">确 定</el-button>
        </div>
    </el-dialog>

    <!-- dialog对话框编辑用户 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisibleEdit">
        <el-form label-position="left" label-width="80px" :model="formdata">
            <el-form-item label="用户名">
                <el-input v-model="formdata.username" disabled></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
                <el-input v-model="formdata.email"></el-input>
            </el-form-item>
            <el-form-item label="电话">
                <el-input v-model="formdata.mobile"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
            <el-button type="primary" @click="editUser()">确 定</el-button>
        </div>
    </el-dialog>
    <!-- dialog对话框设置用户角色 -->
    <el-dialog title="分配角色" :visible.sync="dialogFormVisibleChange">
        <el-form label-position="left" label-width="80px" :model="formdata">
            <el-form-item label="用户名:">
                {{currname}}
            </el-form-item>
            <el-form-item label="角色">
                <el-select v-model="selectVal" placeholder="请选择角色名称">
                    <el-option label="请选择" :value="-1"> </el-option>
                    <el-option v-for="(item,i) in roles" :key="item.id" :label="item.roleName" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisibleChange = false">取 消</el-button>
            <el-button type="primary" @click="setRole()">确 定</el-button>
        </div>
    </el-dialog>
</el-card>
</template>

<script>
export default {
    data() {
        return {
            query: "",
            pagenum: 1,
            pagesize: 2,
            list: [],
            total: 0,
            selectVal: -1,
            formdata: {
                username: "",
                password: "",
                email: "",
                mobile: ""
            },
            dialogFormVisibleAdd: false,
            dialogFormVisibleEdit: false,
            dialogFormVisibleChange: false,
            currname: '',
            roles: [],
            currentID: 0,
        };
    },
    created() {
        this.getUserData();
    },
    methods: {
        async setRole() { //请求体里的参数就要是键值对的方式
            const res = await this.axios.put(`users/${this.currentID}/role`, {
                rid: this.selectVal
            });
            const {
                msg,
                status
            } = res.data.meta;
               console.log(this.currentID)
            console.log(this.selectVal)
            //   console.log(res)
            if (status === 200)
            {
                this.$message.success(msg);
                this.dialogFormVisibleChange=false
            }
        },
        async showDialogChangeRole(users) {
            this.currname = users.username;
            this.currentID = users.id;
            this.dialogFormVisibleChange = true;
            const res = await this.axios.get(`roles`);
            // console.log(res)
            const {
                data,
                meta: {
                    msg,
                    status
                }
            } = res.data;
            if (status === 200) {
                this.roles = data;
                console.log(this.roles)
            }
            const res2= await this.axios.get(`users/${users.id}`)
            this.selectVal=res2.data.data.rid
            console.log(res2.data.data.rid)
        },
        async changeUserstate(users) {
            const res = await this.axios.put(`users/${users.id}/state/${users.mg_state}`);
            const {
                msg,
                status
            } = res.data.meta;
            if (status === 200) {
                this.$message.success(msg);
                // console.log(users.mg_state);
            }
        },
        showDialogeditUser(users) {
            this.formdata = users;
            this.dialogFormVisibleEdit = true
        },
        async editUser() {
            const res = await this.axios.put(`users/${this.formdata.id}`, this.formdata);
            // console.log(res)
            const {
                msg,
                status
            } = res.data.meta;
            if (status === 200) {
                this.getUserData();
                this.dialogFormVisibleEdit = false;
                this.$message.success(msg);
            }
        },
        deleUser(users) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                const res = await this.axios.delete(`users/${users.id}`)
                if (res.data.meta.status === 200) {
                    this.$message.success(res.data.meta.msg);
                    this.pagenum = 1
                    this.getUserData();
                }

            }).catch(() => {
                this.$message.info('取消删除')
            });
        },
        async adduser() {
            this.formdata = {}; //打开添加对话框时清空里面的数据
            const res = await this.axios.post(`users`, this.formdata);
            // console.log(res)
            const {
                data,
                meta: {
                    msg,
                    status
                }
            } = res.data
            if (status === 201) {
                this.dialogFormVisibleAdd = false;
                this.getUserData();
                this.$message.success(msg);

            } else {
                this.$message.error(msg);
            }

        },
        showDialogAdd() {
            this.dialogFormVisibleAdd = true;
        },
        getAllusers() {
            this.getUserData();
        },
        searchUser() {
            this.pagenum = 1;
            this.getUserData();
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            // 当pagenum=3时，调整pagesize=8，会出现没有数据，因为查询数据在数据库中最后一条进行查询的，所以没有
            this.pagenum = 1;
            this.pagesize = val;
            this.getUserData();
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.pagenum = val;
            this.getUserData();
        },
        async getUserData() {
            //   需要授权的 API ，必须在请求头中使用 Authorization 字段提供 token 令牌
            const Askheader = localStorage.getItem("token");
            this.axios.defaults.headers.common["Authorization"] = Askheader;
            const res = await this.axios.get(
                `users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${
          this.pagesize
        }`
            );
            console.log(res);
            const {
                data,
                meta: {
                    msg,
                    status
                }
            } = res.data;
            if (status === 200) {
                this.list = data.users;
                this.total = data.total;
            }
        }
    }
};
</script>

<style>
</style>
