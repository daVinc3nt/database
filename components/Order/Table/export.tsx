import { columns } from "./column";
import { DataTable } from "./datatable";
// import { FindingStudentInfoByAdmin, StudentOperation, token } from "@/ambLib/amb";
import { ProductOperation } from "@/do_an-library/main";
// const conditions: FindingStudentInfoByAdmin[] = [];
async function getData(): Promise<any> {

  // const ProdAction = new ProductOperation()
  // if (criteria == "search")
  // {
  //   console.log(value)
  //   const res = await ProdAction.searchelt(value)
  //   console.log(res)
  //   return res.data;
  // }
  // const res = await ProdAction.search(criteria, value)
  // console.log(res)
  // // const data = await res.json();
  // return res.data;
}
export default async function DemoPage( reloadData:any) {
  // const test = useContext(UserContext)
  const data = await getData()
  let done = 0,pending = 0,cancel = 0;
  data.map((data)=>{
    if (data.status_code === 3) 
      done++;
    else if(data.status_code === 4)
      cancel++;
    else pending++;
  })
  return (
      <DataTable cancel={cancel} done={done} pending={pending} columns={columns} data={data} reloadData={reloadData}/>
  );
  )
}
