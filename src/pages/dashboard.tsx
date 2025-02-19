import DashboardForm from "../components/dashboard/dashboard"
import withAuth from "../components/ProtectedRoute"

function Dashboard(){
    return <div>
        <DashboardForm/>
    </div>
}

export default withAuth(Dashboard, "admin")