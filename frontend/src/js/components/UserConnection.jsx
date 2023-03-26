

function UserConnection() {



    return(
        <div  className="grid grid-cols-4 gap-4 border-8 m-14 p-8">
            <a key={"project._id"} onClick={() => handleClick()}>
                <div className="flex justify-between flex-col border-4 p-4 h-64 rounded bg-slate-400" >
                    <h1 className="text-xl font-bold text-center mb-2 pb-4">{"project.title"}</h1>
                    <hr />
                    <div className="h-44 pt-2 pb-2">
                        <span className="pt-4 pb-4 text-sm">{"project.description"}</span>
                    </div>
                    <hr />
                    <div className="pt-4 h-24">
                        <div className='flex justify-evenly pb-1'>
                            <h3 className="text-xs text-white">{"todoAmount"}</h3>
                            <h3></h3>
                            <h3 className="text-xs text-white">{"incompleteCount"}</h3>
                        </div>
                        <div className='flex flex-col text-center'>
                            <h4 className="text-xs text-gray-700">{"reation"}</h4>
                            <h4 className="text-xs text-gray-700">{"stUpdat"}</h4>
                        </div>
                    </div>
                </div>
            </a>
        </div>

    )
}

export default UserConnection;