import MainCategory from "../components/CategoryPage/MainCategory";
import { MainHeader } from "../components/mainheader";
import { SidebarMenu } from "../components/menupage/SidebarMenu";

const CategoryPage = () => {
  return (
    <div>
      <MainHeader />
      <div className="flex h-screen">
        <SidebarMenu />
        <div className="flex flex-col w-full h-auto">
          <MainCategory />
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
