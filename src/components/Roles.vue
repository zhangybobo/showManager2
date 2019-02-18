<template>
<el-card>
    <cus-bread level1='权限管理' level2='角色列表'></cus-bread>
    <el-button type="sucess" plain @click="showDialogAddRole()">添加角色</el-button>
    <!-- 添加角色对话框 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
        <el-form label-position="left" label-width="80px" :model="formdata">
            <el-form-item label="角色名称">
                <el-input v-model="formdata.roleName"></el-input>
            </el-form-item>
            <el-form-item label="角色描述">
                <el-input v-model="formdata.roleDesc"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
            <el-button type="primary" @click="addrole()">确 定</el-button>
        </div>
    </el-dialog>
    <!-- table获取数据 -->
    <el-table :data="roles" style="width: 100%">
        <el-table-column type="expand" width="30">
            <template slot-scope="scope">
                <el-row v-for="item1 in scope.row.children" :key="item1.id">
                    <el-col :span="4" style="margin-bottom:5px">
                        <el-tag closable type="danger" @close="deleRights(scope.row,item1)">{{item1.authName}}</el-tag><i class="el-icon-arrow-right"></i>
                    </el-col>
                    <el-col :span="20">
                        <el-row v-for="item2 in item1.children" :key="item2.id">
                            <el-col :span="4" style="margin-bottom:5px">
                                <el-tag closable type="info" @close="deleRights(scope.row,item2)">{{item2.authName}}</el-tag><i class="el-icon-arrow-right"></i>
                            </el-col>
                            <el-col :span="20">
                                <el-tag closable type="warning" v-for="item3 in item2.children" :key="item3.id" @close="deleRights(scope.row,item3)">{{item3.authName}}</el-tag>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
                <el-row v-if="scope.row.children.length===0">
                    <el-col>未分配权限</el-col>
                </el-row>
            </template>
        </el-table-column>
        <el-table-column type="index" label="#" width="100"></el-table-column>
        <el-table-column prop="roleName" label="角色名称" width="200"></el-table-column>
        <el-table-column prop="roleDesc" label="角色描述" width="200"></el-table-column>
        <el-table-column label="操作" width="300">
            <template slot-scope="scope">
                <!-- @click="showDialogeditUser(scope.row)" -->
                <el-button type="primary" icon="el-icon-edit" circle size="mini" plain></el-button>
                <el-button type="danger" icon="el-icon-delete" circle size="mini" plain></el-button>
                <el-button @click="showDialogSetRole(scope.row)" type="success" icon="el-icon-check" circle size="mini" plain></el-button>
            </template>
        </el-table-column>
    </el-table>
    <!-- dialog权限对话框 -->
    <el-dialog title="分配权限" :visible.sync="dialogFormVisibleSetRole">
        <!-- node-key 每个节点唯一标识,值来源于treedata中的key名 -->
        <!-- default-expand-all默认展开所有节点 这是简单的方法，还有:default-expanded-keys="arrexpand"这样需要自己写 -->
        <el-tree ref="treeDom" :data="treedata" show-checkbox node-key="id" default-expand-all :default-checked-keys="arrCheck" :props="defaultProps"></el-tree>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisibleSetRole = false">取 消</el-button>
            <el-button type="primary" @click="setRights()">确 定</el-button>
        </div>
    </el-dialog>
</el-card>
</template>

<script>
export default {
    data() {
        return {
            formdata: {
                roleName: '',
                roleDesc: '',
            },
            dialogFormVisibleAdd: false,
            dialogFormVisibleSetRole: false,
            roles: [],
            roleId:0,
            treedata: [],
            arrCheck: [],
            defaultProps: {
                label: 'authName',
                children: 'children'
            }
        }
    },
    created() {
        this.getTableData()
    },
    methods: {
        async setRights(){
          const arr1=this.$refs.treeDom.getCheckedKeys();//用dom元素来调用方法
        //   console.log(arr1)
          const arr2=this.$refs.treeDom.getHalfCheckedKeys();
        //   console.log(arr2)
          const arr=[...arr1,...arr2]
        //   console.log(arr)
          const res=await this.axios.post(`roles/${this.roleId}/rights`,{rids:arr.join(",")})
          const {
                data,
                meta: {
                    msg,
                    status
                }
            } = res.data
            // console.log(res)
            if (status === 200)
            {
              this.getTableData()
              this.dialogFormVisibleSetRole=false
              this.$message.success(msg)

            }
        },
        async showDialogSetRole(role) {
            this.roleId=role.id
            const res = await this.axios.get(`rights/tree`);
            // console.log(role)
            const {
                data,
                meta: {
                    msg,
                    status
                }
            } = res.data
            if (status === 200) {
                this.treedata = data
                
                this.dialogFormVisibleSetRole = true
                const temp=[]
                role.children.forEach(item1 => {
                    item1.children.forEach(item2 => {
                        item2.children.forEach(item3 => {
                            temp.push(item3.id)
                        })
                    })
                });
                this.arrCheck=temp
            }

        },
        async deleRights(role, rights) {
            // console.log(role)
            const res = await this.axios.delete(`roles/${role.id}/rights/${rights.id}`)
            // console.log(res)
            const {
                data,
                meta: {
                    msg,
                    status
                }
            } = res.data
            if (status === 200) {
                role.children = data //只更新当前角色的权限，不用重新渲染数据
            }

        },
        async showDialogAddRole() {
            this.dialogFormVisibleAdd = true
        },
        async addrole() {
            const res = await this.axios.post('roles', this.formdata);
            console.log(res)
            if (res.data.meta.status === 201) {
                this.$message.success(res.data.meta.msg);
                this.dialogFormVisibleAdd = false
            }
        },
        async getTableData() {
            const res = await this.axios.get(`roles`);
            // console.log(res)
            if (res.data.meta.status === 200) {
                this.roles = res.data.data
            }
        }
    },
}
</script>

<style>

</style>
