import axios, { AxiosResponse } from "axios";
import { columns } from "./column";
import { DataTable } from "./datatable";
// import { FindingStudentInfoByAdmin, StudentOperation, token } from "@/ambLib/amb";
import { ProductOperation } from "@/do_an-library/main";
// const conditions: FindingStudentInfoByAdmin[] = [];
async function getData(criteria ,value): Promise<any> {

  const ProdAction = new ProductOperation()
  if (criteria == "search")
  { 
    const res = await ProdAction.searchelt(value)
    return res.data;
  }
  const res = await ProdAction.search(criteria, value)
  const newItem = {
    "name": "Sản phẩm thử nghiệm",
    "price": 100000.00,
    "description": "Sản phẩm thử nghiệm",
    "image": "product.png",
    "category_id": 1,
    "seller_id": "SEL0000001",
    "variants": [
        {
            "attributes": [
                {
                    "attribute_id": 1,
                    "value": "Vàng" 
                },
                {
                    "attribute_id": 6,
                    "value": "Mỹ" 
                }
            ]
        },
        {
            "attributes": [
                {
                    "attribute_id": 1,
                    "value": "Đỏ" 
                },
                {
                    "attribute_id": 6,
                    "value": "Ấn Độ" 
                }
            ]
        }
    ]
}
  const response: AxiosResponse = await axios.post(`http://localhost:8000/api/products`, newItem, {
      headers: {
        'Content-Type': 'application/json'
      },
      validateStatus: status => status >= 200 && status <= 500
  });
  // const response: AxiosResponse = await axios.post(`http://localhost:8000/api/products`, newItem, {
  //         validateStatus: status => status >= 200 && status <= 500,
  //         headers: {
               
  //         });
  console.log(response)
  // const data = await res.json();
  return res.data.data;
}
export default async function DemoPage(criteria:string, value:string, reloadData:any) {
  // const test = useContext(UserContext)
  const data = await getData(criteria, value);
  const columnsWdata = await columns(reloadData);
  if (data)
    return(
      <div>
        <DataTable columns={columnsWdata} data={data} reload={reloadData}/>
      </div>
    )
  else 
    return(
      <div className="text-xl flex items-center">
        Lỗi xảy ra vui lòng thử lại!
      </div>
  )
}
