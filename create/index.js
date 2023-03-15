
class Table{
    constructor(){
        this.doneState = false;
        this.addbut1 = document.querySelector(".add>.one");
        this.addbut2 = document.querySelector(".add>.two");
        this.anchor = document.querySelector(".add>a");
        this.table = document.querySelector("table");
        this.tableHead = document.querySelector("table>thead");
        this.headRow = document.querySelector("thead>tr");
        this.tableBody = document.querySelector("table>tbody");

        this.deltop = document.querySelector(".top-row");
        this.delleft = document.querySelector(".left-col");
        // this.allbodycols = document.querySelectorAll("tbody>tr>td");
    }

    events(){
        this.addbut1.addEventListener("click",() => this.addrow());
        this.addbut2.addEventListener("click",() => this.addcol());
        this.deltop.addEventListener("click",(ev) => this.delitems("data-col", ev.target));
        this.delleft.addEventListener("click",(ev) => this.delitems("data-row", ev.target));
        this.anchor.addEventListener("click", () => this.save());
    }

    allbodyrows(){
        return document.querySelectorAll("tbody>tr");
    }
    headCols(){
        return document.querySelectorAll("thead>tr>th");
    }

    delitems(what, id){
        if (id.dataset.id > 0) {
            const ar = document.querySelectorAll(`[${what}='${id.dataset.id}']`);
            for (const oi of ar.values()) {
                oi.remove();
            }
            id.remove()
        }
        // console.log(what ,id)
    }

    delbutton(lennum, parent){
        const li = document.createElement("li");
        li.setAttribute("data-id", lennum);
        li.tabIndex = 0;
        li.textContent = "del";
        parent.appendChild(li);
    }

    addrow(){
        const row = document.createElement("tr");
        const ek = this.allbodyrows().length
        row.setAttribute("data-row",ek + 1);
        this.tableBody.appendChild(row);

        const len = this.headCols().length;

        this.delbutton(ek+1,this.delleft);

        for (let i=0;i<len;i++){
            const col = document.createElement("td");
            col.setAttribute("data-col",i);
            col.tabIndex = 0;
            col.contentEditable = true;
            row.appendChild(col);   
        }
    }
    addcol(){
        const len = this.headCols().length;
        const row1 = this.allbodyrows();
        const headcol = document.createElement("th");
        headcol.setAttribute("data-col",len);
        headcol.tabIndex = 0;
        headcol.contentEditable = true;
        this.headRow.appendChild(headcol);

        this.delbutton(len,this.deltop);

        Object.values(row1).map((e,i) => {
            const col = document.createElement("td");
            col.setAttribute("data-col",len);
            col.tabIndex = 0;
            col.contentEditable = true;
            e.appendChild(col);
        })
    }

    async save(){
        if (this.doneState) {
            this.anchor.download = await writeXlsxFile(TableApp.objects, {
            schema: TableApp.schema,
            fileName: "newfile.xlsx"
            });
            this.doneState = false;
        } else if (!this.doneState) {
            alert("please click on done first");
        }
    }

    // TableApp.anchor.addEventListener("click", async () => {
    //     if (TableApp.doneState) {
    //       TableApp.anchor.download = await writeXlsxFile(TableApp.objects, {
    //         schema: TableApp.schema,
    //         fileName: "newfile.xlsx"
    //       });
    //       TableApp.doneState = false;
    //     } else if (!TableApp.doneState) {
    //       alert("please click on done first");
    //     }
    //   });

    // createtable(){
    //     for (let i=0;i<3;i++){
    //         const row = document.createElement("tr");
    //         row.setAttribute("data-row",i+1)
    //         this.tableBody.appendChild(row);
    //         const head = document.createElement("th");
    //         head.setAttribute("data-col",i)
    //         head.contentEditable = true;
    //         this.headRow.appendChild(head);
    //         for (let j=0;j<3;j++){
    //             const data = document.createElement("td");
    //             data.setAttribute("data-col",j)
    //             data.contentEditable = true;
    //             row.appendChild(data);
    //         }
    //     }
    // }
}

const tableOne = new Table();
// tableOne.createtable();
// tableOne.update();
tableOne.events();

console.log(writeXlsxFile)