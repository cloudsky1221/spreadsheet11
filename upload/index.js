
// const log = (l) => console.log(l);

// const inFile = document.querySelector("input");
// const anchor = document.querySelector("a");

// let b;

// inFile.addEventListener("change", (ev) => {
//   readXlsxFile(ev.target.files[0]).then((rows) => tableOne.createtable(rows));
// //   anchor.href = URL.createObjectURL(ev.target.files[0]);
// //   anchor.download = "ala.xlsx";
// });


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

        window.addEventListener("click", (ev) => this.changewidthheight());

        this.inFile = document.querySelector("input");

        // this.allbodycols = document.querySelectorAll("tbody>tr>td");
    }

    events(){
        this.addbut1.addEventListener("click",() => this.addrow());
        this.addbut2.addEventListener("click",() => this.addcol());
        this.deltop.addEventListener("click",(ev) => this.delitems("data-col", ev.target));
        this.delleft.addEventListener("click",(ev) => this.delitems("data-row", ev.target));
        this.anchor.addEventListener("click", () => this.save());

        this.inFile.addEventListener("change", (ev) => {
            readXlsxFile(ev.target.files[0]).then((rows) => this.createtable(rows));
            this.addbut1.style.display = "inline";
            this.addbut2.style.display = "inline";
          });

        // window.addEventListener("click",() => console.log(document.querySelector("thead>tr>th")))
    }

    changewidthheight(){
        const heads = document.querySelectorAll("thead>tr>th");
        const tails = document.querySelectorAll("tr");

        const alltop = document.querySelectorAll(".top-row>li");
        const allleft = document.querySelectorAll(".left-col>li");
        
        for (let i=0;i<heads.length;i++){
            alltop[i].style.width = `${(heads[i].clientWidth - 2)}px`;
        };
        for (let j=0;j<tails.length;j++){
            allleft[j].style.height = `${(tails[j].clientHeight - 2)}px`;
        }
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
    }

    delbutton(lennum, parent){
        const li = document.createElement("li");
        li.setAttribute("data-id", lennum);
        li.tabIndex = 0;
        li.textContent = "del";
        parent.appendChild(li);
    }

    addrow(){
        // if (document.querySelectorAll("tr").length == 1){
        //     this.delbutton(0,this.delleft);
        // }
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

    createtable(total){
        this.delbutton(0,this.delleft);
        for (let i=0;i<total[0].length;i++){
            const head = document.createElement("th");
            head.textContent = total[0][i]
            head.setAttribute("data-col",i)
            head.contentEditable = true;
            this.headRow.appendChild(head);
            this.delbutton(i,this.deltop);
        };
        for (let j=1;j<total.length;j++){
            const row = document.createElement("tr");
            row.setAttribute("data-row",j)
            this.tableBody.appendChild(row);
            this.delbutton(j,this.delleft);
            for (let k=0;k<total[0].length;k++){
                const data = document.createElement("td");
                data.textContent = total[j][k]
                data.setAttribute("data-col",k)
                data.contentEditable = true;
                row.appendChild(data);
            };
        };
        this.changewidthheight()
    };
};

const tableOne = new Table();
tableOne.events();

