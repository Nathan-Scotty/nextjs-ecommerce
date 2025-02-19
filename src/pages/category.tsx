import DashboardForm from "../components/dashboard/dashboard";
import CategoryManagement from "../components/category/components/categoryManagement";
import withAuth from "../components/ProtectedRoute";


function Category(){

    return <div>
        <DashboardForm/>
        <CategoryManagement/>
    </div>
}

export default  withAuth(Category, "admin")