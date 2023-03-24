import useAuthStore from "../hooks/useAuthStore";


function Dashboard() {

    const user = useAuthStore(state => state.getUser());
    console.log(user);

    
    return(
        <div  className="DashboardContainer">
            <h1>Dashboard</h1>
            {/* <h2>{user}</h2> */}
        </div>
    )

}

export default Dashboard;