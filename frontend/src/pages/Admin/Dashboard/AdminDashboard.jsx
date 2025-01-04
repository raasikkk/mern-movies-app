import Squares from "../../../animation/Squares";
import Main from "./Main/Main";

const AdminDashboard = () => {
  return (
    <div className="pt-28 relative  w-full">
      <div className="absolute -z-10 top-0 bottom-0 left-0 right-0">
        <Squares
          speed={0.1}
          size={10}
          direction="up" // up, down, left, right, diagonal
          borderColor="#FF0000"
          hoverFillColor="#222"
        />
      </div>
      <div className="container mx-auto">
        <h1 className="text-3xl text-center font-semibold pt-5">
          Admin Dashboard
        </h1>
        <Main />
      </div>
    </div>
  );
};

export default AdminDashboard;
