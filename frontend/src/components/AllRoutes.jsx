import { Route, Routes } from "react-router-dom";
import PlanData from "../pages/PlanData";
import RolesAdd from "../pages/RolesAdd";
// import Details from "../pages/Details";


function AllRoutes() {
  return (
    <Routes>
        <Route path="/" element={<PlanData/>} ></Route>
        <Route path="/roles" element={<RolesAdd/>} ></Route>
        {/* <Route path="/details" element={<Details/>} ></Route> */}
    </Routes>
  );
}

export default AllRoutes;
