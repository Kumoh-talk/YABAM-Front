import { MainHeader } from "../components/mainheader";
import { SidebarMenu } from "../components/menupage/SidebarMenu";
import MainProduct from "../components/menupage/mainproductpage";   
import MenuList from "../components/menupage/menulist";

const ProductPage = () => {
    return (
        <>  
        <MainHeader />
        <div className="flex h-screen">
         <SidebarMenu />
         <div className="flex flex-col w-full h-auto">
         <MainProduct />
         </div>
        </div>
        </>
    )
}

export default ProductPage;
