import DashboardForm from "../components/dashboard/dashboard";
import ProductManagement from "../components/product/components/productManagement";
import { withAuth } from "../components/ProtectedRoute";

//export const getServerSideProps = (context) => withAuth(context, 'admin')

export default function Product(){

    return <div>
        <DashboardForm/>
        <ProductManagement/>
    </div>
}