interface Table {
    page: number,
    size: number,
    total?: number
}

export const Table: Table = {
    page: 1,
    size: 10,
    total: 999
    // 组件的“其余部分”
}

interface Search {
    name: string,
    address: string
}

class TableFun {
    static getData(table: Table, search?: Search): any {
        console.log(table, search)
        const data = [{
            date: '2021年7月1日 08:50:07',
            name: "linxd",
            address: "黑龙江哈尔滨"
        }];
        for (let i = 0; i < 10; i++) {
            data.push(data[0]);
        }
        return data;
    }

    search(table: Table, search: Search): any {
        return TableFun.getData(table, search);
    }
}

export {TableFun}
