<template>
    <div>
        <div class="searchBox">
            <el-row :gutter="15">
                <el-col :span="8">
                    <el-input placeholder="请输入姓名" v-model="searchName"></el-input>
                </el-col>
                <el-col :span="8">
                    <el-input placeholder="请输入地址" v-model="searchAddress"></el-input>
                </el-col>
                <el-col :span="8">
                    <el-button @click="searchFun" type="primary" size=""><i class="el-icon-search"></i> 搜索
                    </el-button>
                    <el-button @click="reset"><i class="el-icon-delete"></i> 清空</el-button>
                </el-col>
            </el-row>
        </div>
        <el-table
                :data="tableData"
                style="width: 100%">
            <el-table-column
                    type="index"
                    prop="date"
                    label="序号">
            </el-table-column>
            <el-table-column
                    prop="date"
                    label="日期">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="姓名">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="地址">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="操作">
                <template #default="scope">
                    <el-button @click="showInfo(scope.row,scope.$index)" type="primary" size="small"><i
                            class="el-icon-view"></i> 查看
                    </el-button>
                    <el-button type="success" size="small"><i class="el-icon-edit"></i> 编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pageBox">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="page"
                    :page-sizes="[100, 200, 300, 400]"
                    :page-size="size"
                    layout="total, sizes, prev, pager, next"
                    :total="total">
            </el-pagination>
        </div>
    </div>
</template>


<script lang="ts">
    import {defineComponent, reactive, toRefs, onMounted} from 'vue';
    import {TableFun, Table} from './tableTs/Table'

    export default defineComponent({
        name: "Table",
        setup: function () {
            let data = reactive({
                tableData: [],
                searchName: "",
                searchAddress: "",
                ...Table
            })
            onMounted(() => {
                data.tableData = TableFun.getData({page: data.page, size: data.size});
            })
            let showInfo = (row: any, index: number) => {
                console.log(row, index)
            }
            let searchFun = () => {
                data.tableData = TableFun.search({page: data.page, size: data.size}, {
                    name: data.searchName,
                    address: data.searchAddress
                });
            }
            let reset = () => {
                data.searchName = "";
                data.searchAddress = "";
            }
            const handleSizeChange = (e: number) => {
                data.size = e;
                data.tableData = TableFun.getData({page: data.page, size: data.size});
            }
            const handleCurrentChange = (e: number) => {
                data.page = e;
                data.tableData = TableFun.getData({page: data.page, size: data.size});
            }

            return {
                ...toRefs(data),
                showInfo,
                searchFun,
                reset,
                handleSizeChange,
                handleCurrentChange
            }
        },
    })
</script>

<style scoped>

</style>
