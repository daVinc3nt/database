import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { Button } from "@nextui-org/react";
import CustomDropdown from "./dropdown";
import { FaMapMarkedAlt } from "react-icons/fa";
// import { FormattedMessage, useIntl } from "react-intl";
// import { CreatingProductInfo, ProductOperation, token } from "@/ambLib/amb";
import cookie from "js-cookie"
import { attribute, CreateProduct, variant } from "@/do_an-library/interfaces";
import { ProductOperation } from "@/do_an-library/main";
import { CiCirclePlus } from "react-icons/ci";
import { toast } from "sonner";
interface AddStaffProps {
  onClose: () => void;
  reload: any;
}
function newCardset(mang, index, phanTuMoi) {
  mang.splice(index + 1, 0, phanTuMoi);
  return mang;
}
const AddStaff: React.FC<AddStaffProps> = ({ onClose, reload }) => {
  const openModal = (type) => {
    setType(type);
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };

  const [isShaking, setIsShaking] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [type, setType] = useState();
  // const intl = useIntl();
  const [newSet, setSet]  = useState<variant[]>(
    Array(2).fill(null).map(() => ({
      attributes: Array(3).fill(null).map(() => ({ attribute_id: 0, value: "" }))
    })));
  const categories = {
    "Điện tử & Công nghệ" : 1,
    "Thời trang & Phụ kiện": 2 ,
    "Nhà cửa & Đời sống": 3 ,
    "Sức khỏe & Làm đẹp": 4 ,
    "Thể thao & Dã ngoại": 5,
    "Thực phẩm & Đồ uống": 6 ,
    "Sách & Văn phòng phẩm": 7,
    "Đồ chơi & Mẹ bé": 8,
  };
  const attributes = {
    "Màu sắc": 1,
    "Kích thước": 2,
    "Cân nặng": 3,
    "Chất liệu": 4,
    "Thương hiệu": 5,
    "Xuất xứ": 6,
    "Bộ nhớ": 7,
    "RAM": 8,
    "Chip xử lý": 9,
    "Dung lượng pin": 10,
    "Độ phân giải màn hình": 11,
    "Camera": 12,
    "Kiểu dáng": 13,
    "Mùa sử dụng": 14,
    "Hạn sử dụng": 15,
    "Khối lượng tịnh": 16,
    "Thành phần": 17,
    "Hướng dẫn bảo quản": 18,
    "Calories": 19,
    "Loại da phù hợp": 20,
    "Công dụng chính": 21,
    "Dung tích": 22,
    "Độ tuổi khuyên dùng": 23,
    "Công suất": 24,
    "Điện áp": 25,
    "Bảo hành": 26,
    "Số trang": 27,
    "Nhà xuất bản": 28,
    "Năm xuất bản": 29,
    "Ngôn ngữ": 30,
    "Độ tuổi khuyến nghị": 31,
    "Chứng nhận an toàn": 32
  };
  const categoryAttributes = {
    1: [
      "Bộ nhớ", "RAM", "Chip xử lý", "Dung lượng pin", "Độ phân giải màn hình", "Camera", "Bảo hành", "Thương hiệu", "Xuất xứ"
    ],
    2: [
      "Màu sắc", "Kích thước", "Chất liệu", "Thương hiệu", "Xuất xứ", "Kiểu dáng", "Mùa sử dụng"
    ],
    3: [
      "Công suất", "Điện áp", "Bảo hành", "Thương hiệu", "Xuất xứ", "Cân nặng"
    ],
    4: [
      "Loại da phù hợp", "Công dụng chính", "Dung tích", "Độ tuổi khuyên dùng", "Hạn sử dụng"
    ],
    6: [
      "Hạn sử dụng", "Khối lượng tịnh", "Thành phần", "Hướng dẫn bảo quản", "Calories"
    ],
    7: [
      "Số trang", "Nhà xuất bản", "Năm xuất bản", "Ngôn ngữ", "Cân nặng"
    ],
    8: [
      "Độ tuổi khuyến nghị", "Chứng nhận an toàn", "Thương hiệu", "Xuất xứ"
    ]
  };
  
  const initialProductData: CreateProduct = {
    name: "",
    price: 0,
    description: "",
    image: "",
    seller_id: "",
    category_id:0,
    variants: []
};

  const [Productdata, setProductdata] = useState<CreateProduct>(initialProductData);
  const handleClickOutside = (event: MouseEvent) => {
    if (
      notificationRef.current &&
      !notificationRef.current.contains(event.target as Node)
    ) {
      setIsShaking(true);
      setTimeout(() => {
        setIsShaking(false);
      }, 300);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleAnimationComplete = () => {
    if (!isVisible) {
      onClose();
    }
  };

  const handleInputChange = (key: keyof CreateProduct, value: any) => {
    setProductdata((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };


  // A function to handle the password input change

  // A function to handle the confirm password input change
  // const handleConfirm = async () => {
  //   const Order = new OrdersOperation();
  //   const condition: UploadingOrderFileCondition = {
  //     file: selectedFile,
  //   };
  //   console.log(condition);
  //   try {
  //     const checkfile = await Order.checkFileFormat(condition);
  //     console.log(checkfile);
  //     if (checkfile.error.error) {
  //       alert(checkfile.error.message);
  //       setSelectedFile(null);
  //       return;
  //     }
  //     if (checkfile.valid === false) {
  //       alert(checkfile.message);
  //       setSelectedFile(null);
  //       return;
  //     }
  //     const response = await Order.createByFile(condition);
  //     console.log(response);
  //     alert(response.message);
  //     setSelectedFile(null);
  //     reload();
  //   } catch (e) {
  //     console.log(e);
  //     alert("Đã xảy ra lỗi hệ thống, vui lòng thử lại sau!");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault()
    const Product =new ProductOperation()
    Productdata.seller_id = "SEL0000001";
    Productdata.variants = newSet;
    const res= await Product.create(Productdata)
    setProductdata(initialProductData)  
    alert(res.message)
    reload();
    setSet(Array(2).fill(null).map(() => ({
      attributes: Array(3).fill(null).map(() => ({ attribute_id: 0, value: "" }))
    })))
  };
  // useEffect(()=>{
  //   console.log(newSet)
  //   console.log(newSet[0].attributes[0].attribute_id)
  // },[newSet])
  return (
    
    <motion.div
      className="fixed h-screen top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-60 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      onAnimationComplete={handleAnimationComplete}
      style={{ backdropFilter: "blur(12px)" }}
    >
      <motion.div
        ref={notificationRef}
        className={`h-screen lg:w-1/2 bg-white dark:bg-[#14141a] rounded-xl p-4 ${
          isShaking ? "animate-shake" : ""
        }`}
        initial={{ scale: 0 }}
        animate={{ scale: isVisible ? 1 : 0 }}
        exit={{ scale: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative items-center justify-center flex-col flex h-10 w-full border-b-2 border-[#545e7b]">
          <div className="font-bold text-lg sm:text-2xl pb-2 text-white w-full text-center">
            Add product
          </div>
          <IoMdClose className=" absolute right-0 w-8 h-8 cursor-pointer
            rounded-full mb-2 text-white hover:bg-gray-400 hover:text-black"
            onClick={handleClose}/>
        </div>
        <form
          method="POST" onSubmit={handleSubmit}
          className="h-[calc(100vh-100px)] w-full flex flex-col  gap-10"
        >
          <div className="h-1/3 border border-[#545e7b] mt-4 no-scrollbar flex flex-col items-center bg-white  dark:bg-[#14141a] p-5 rounded-md text-black dark:text-white">
            <div 
              className="w-fit h-fit"
            >
              <div className="flex gap-3 mt-3">
              <input required
                  type="text"
                  className="text-xs md:text-sm border border-gray-600 rounded  bg-white dark:bg-[#14141a] h-10 p-2 w-full"
                  placeholder={"Name"}
                  value={Productdata.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                />
                
                <input required
                  type="text"
                  className="text-xs md:text-sm border border-gray-600 rounded  bg-white dark:bg-[#14141a] h-10 p-2 w-full"
                  placeholder={"Description"}
                  value={Productdata.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                />
                
                <input required
                  type="text"
                  className="text-xs md:text-sm border border-gray-600 rounded  bg-white dark:bg-[#14141a] h-10 p-2 w-full"
                  placeholder={"Image (only png, jgp allowed)"}
                  value={Productdata.image}
                  onChange={(e) => {
                    handleInputChange("image", e.target.value)}}
                />
              </div>
              
              <div className="flex gap-3 mt-3"> 
                  <input required
                    type="number"
                    className="text-xs md:text-sm border border-gray-600 rounded  bg-white dark:bg-[#14141a] h-10 p-2 w-full"
                    placeholder={"Price (Ex: 200.00)"}
                    value={Productdata.price ? Productdata.price :""}
                    onChange={(e) => handleInputChange("price", e.target.valueAsNumber)}
                  />
              </div>
              <div className="flex gap-3 mt-3">
                <div
                  className={`text-xs text-center md:text-sm border border-gray-600 rounded  bg-white  dark:bg-[#14141a] h-10 p-2 w-fit
                  `}
                >
                  <CustomDropdown
                    label={"Choose category"}
                    options={Object.keys(categories)}
                    selectedOption={Productdata.category_id !== null && Object.entries(categories).find(([key, val]) => val === Productdata.category_id)?.[0]}
                    onSelectOption={(option) => handleInputChange("category_id", categories[option])}
                  />
                </div>                 
              </div>
        
            </div>
          </div>
          {Productdata.category_id !== 0 && <div className="h-2/3 overflow-y-scroll">
            <div className="w-full text-3xl text-center">Create variants</div>
            <div className="flex min-h-72 flex-col gap-5 text-white">
                {newSet.map((ele,i)=> {
                  return (
                  <div 
                      key={i}
                      className=" w-full h-52 flex p-5
                      flex-col gap-5 rounded-xl  border border-[#545e7b] relative"
                  >
                    <div className="flex gap-5 items-center">
                      <CustomDropdown
                        label={"Choose attribute"}
                        options={categoryAttributes[Productdata.category_id]}
                        selectedOption={Object.entries(attributes).find(([key, val]) => val === newSet[i].attributes[0].attribute_id)?.[0]
                        }
                        onSelectOption={(option)=>{setSet((prevSet) => {
                          const updatedSet = [...prevSet];
                          updatedSet[i].attributes[0].attribute_id = attributes[option];
                          return updatedSet;
                        })}}
                      />
                      <input 
                        type="text" 
                        value={newSet[i].attributes[0].value} 
                        className="text-xs md:text-sm border border-gray-600 bg-transparent rounded h-10 p-2 w-full"
                        placeholder="Details"
                        onChange={(e)=>{setSet((prevSet) => {
                        const updatedSet = [...prevSet];
                        updatedSet[i].attributes[0].value = e.target.value;
                        return updatedSet;
                      })}}/>
                    </div>
                    <div className="flex gap-5 items-center">
                      <CustomDropdown
                        label={"Choose attribute"}
                        options={categoryAttributes[Productdata.category_id]}
                        selectedOption={Object.entries(attributes).find(([key, val]) => val === newSet[i].attributes[1].attribute_id)?.[0]
                        }
                        onSelectOption={(option)=>{setSet((prevSet) => {
                          const updatedSet = [...prevSet];
                          updatedSet[i].attributes[1].attribute_id = attributes[option];
                          return updatedSet;
                        })}}
                      />
                      <input 
                        type="text" 
                        value={newSet[i].attributes[1].value} 
                        className="text-xs md:text-sm border border-gray-600 bg-transparent rounded h-10 p-2 w-full"
                        placeholder="Details"
                        onChange={(e)=>{setSet((prevSet) => {
                        const updatedSet = [...prevSet];
                        updatedSet[i].attributes[1].value = e.target.value;
                        return updatedSet;
                      })}}/>
                    </div>
                    <div className="flex gap-5 items-center">
                      <CustomDropdown
                        label={"Choose attribute"}
                        options={categoryAttributes[Productdata.category_id]}
                        selectedOption={Object.entries(attributes).find(([key, val]) => val === newSet[i].attributes[2].attribute_id)?.[0]
                        }
                        onSelectOption={(option)=>{setSet((prevSet) => {
                          const updatedSet = [...prevSet];
                          updatedSet[i].attributes[2].attribute_id = attributes[option];
                          return updatedSet;
                        })}}
                      />
                      <input 
                        type="text" 
                        value={newSet[i].attributes[2].value} 
                        className="text-xs md:text-sm border border-gray-600 bg-transparent rounded h-10 p-2 w-full"
                        placeholder="Details"
                        onChange={(e)=>{setSet((prevSet) => {
                        const updatedSet = [...prevSet];
                        updatedSet[i].attributes[2].value = e.target.value;
                        return updatedSet;
                      })}}/>
                    </div>
                    <div className="opacity-0  hover:opacity-100 grid place-items-center p-1">
                        <CiCirclePlus 
                        onClick={()=>{
                            let newArray =[...newSet]
                            newArray = newCardset(newArray, i, 
                            {
                              attributes: 
                              Array(3).fill(null).map(() => ({ attribute_id: 0, value: "" }))
                            }
                            )
                            setSet(newArray)
                        }}
                        size={30}
                        className="w-fit h-fit bg-black/40 rounded-full 
                        hover:cursor-pointer active:scale-150 transition-all text-white ease-in-out 
                        duration-500"/>
                    </div>
                  </div>
                )}
                )}
            </div>
          </div>}

          <Button
            className="w-full rounded-lg mt-5 mb-1 py-3 border-green-700 hover:bg-green-700 text-green-500
          bg-transparent drop-shadow-md hover:drop-shadow-xl hover:text-white border hover:shadow-md"
            onClick={()=>{}}
             type="submit"
          >
             Add
          </Button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default AddStaff;
