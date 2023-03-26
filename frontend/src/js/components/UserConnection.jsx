import axios from "axios";
import { BASE_URL, getHeader } from '../services/config'

import { useEffect, useState } from "react";

import useAuthStore from "../hooks/useAuthStore";



function UserConnection() {

    const token = useAuthStore(state => state.getToken());

    const [searchQuery, setSearchQuery] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [filterArray, setFilterArray] = useState([])
    const [friends, setFriends] = useState([])
    const [incoming, setIncoming] = useState([])
    const [outgoing, setOutgoing] = useState([])





    useEffect(()=>{
        (async function () {
            try {
                let response = await axios.get(BASE_URL+'protected/connect', getHeader(token))
                let filter = response.data.friendsList.concat(response.data.incomingReq, response.data.outgoingReq)
                setFilterArray(filter)
                setFriends(response.data.friendsList)
                setIncoming(response.data.incomingReq);
                setOutgoing(response.data.outgoingReq)
                
            } catch (error) {
                console.log(error);
            }
      
          })();
    },[]);

    console.log(filterArray);


    useEffect(()=>{
        console.log("🚀 ~ file: UserConnection.jsx:15 ~ UserConnection ~ searchQuery:", searchQuery)

        if(searchQuery === '') setSearchResult([]);

        const timer = setTimeout(async () => {
            try {
                let response = await axios.get(BASE_URL+`protected/users?q=${searchQuery}`, getHeader(token))
                setSearchResult(response.data);
            } catch (error) {
                console.log(error);
            }
        }, 1000);
        return () => clearTimeout(timer);
    },[searchQuery]);



    const handleInvitation = async (userId) => {        
        try {
            let response = await axios.get(BASE_URL+`protected/invite/${userId}`, getHeader(token));
            console.log("🚀 ~ file: UserConnection.jsx:42 ~ handleInvitation ~ response:", response)

        } catch (error) {
            console.log(error);
        }

    }

    
    let foundPeople = searchResult.map(user => {
        let creation = new Date(user.createdAt).toLocaleString("de-DE");
        
        return (
            <a key={user._id} onClick={() => handleInvitation(user._id)}>
                <div className="flex justify-between flex-col border-4 p-4 h-64 rounded bg-slate-400 cursor-pointer" >
                    <h1 className="text-xl font-bold text-center mb-2 pb-4">{user.username}</h1>
                    <hr />
                    <div className="h-44 text-center ">
                        <span className="pt-4 pb-4 text-sm">
                            <p className="pt-6 pb-4 text-center text-5xl text-gray-600">Invite</p>
                        </span>
                    </div>
                    <hr />
                    <div className="pt-4 h-24">
                        <div className='flex justify-evenly pb-1'>
                        </div>
                        <div className='flex flex-col text-center'>
                            <h4 className="text-xs text-gray-700">User since: {creation}</h4>
                        </div>
                    </div>
                </div>
            </a>
        )
    });

    let YourFriends = friends.map(user => {
        let creation = new Date(user.createdAt).toLocaleString("de-DE");
        
        return (
            <a key={user._id} onClick={() => handleInvitation(user._id)}>
                <div className="flex justify-between flex-col border-4 p-4 h-64 rounded bg-slate-400 cursor-pointer" >
                    <h1 className="text-xl font-bold text-center mb-2 pb-4">{user.username}</h1>
                    <hr />
                    <div className="h-44 text-center ">
                        <span className="pt-4 pb-4 text-sm">
                            <p className="pt-6 pb-4 text-center text-5xl text-gray-600">Invite</p>
                        </span>
                    </div>
                    <hr />
                    <div className="pt-4 h-24">
                        <div className='flex justify-evenly pb-1'>
                        </div>
                        <div className='flex flex-col text-center'>
                            <h4 className="text-xs text-gray-700">User since: {creation}</h4>
                        </div>
                    </div>
                </div>
            </a>
        )
    });

    let peopleYouInvited = outgoing.map(user => {
        let creation = new Date(user.createdAt).toLocaleString("de-DE");
        
        return (
            <a key={user._id} onClick={() => handleInvitation(user._id)}>
                <div className="flex justify-between flex-col border-4 p-4 h-64 rounded bg-slate-400 cursor-pointer" >
                    <h1 className="text-xl font-bold text-center mb-2 pb-4">{user.username}</h1>
                    <hr />
                    <div className="h-44 text-center ">
                        <span className="pt-4 pb-4 text-sm">
                            <p className="pt-6 pb-4 text-center text-5xl text-gray-600">Invite</p>
                        </span>
                    </div>
                    <hr />
                    <div className="pt-4 h-24">
                        <div className='flex justify-evenly pb-1'>
                        </div>
                        <div className='flex flex-col text-center'>
                            <h4 className="text-xs text-gray-700">User since: {creation}</h4>
                        </div>
                    </div>
                </div>
            </a>
        )
    });

    let AcceptInvitation = incoming.map(user => {
        let creation = new Date(user.createdAt).toLocaleString("de-DE");
        
        return (
            <a key={user._id} onClick={() => handleInvitation(user._id)}>
                <div className="flex justify-between flex-col border-4 p-4 h-64 rounded bg-slate-400 cursor-pointer" >
                    <h1 className="text-xl font-bold text-center mb-2 pb-4">{user.username}</h1>
                    <hr />
                    <div className="h-44 text-center ">
                        <span className="pt-4 pb-4 text-sm">
                            <p className="pt-6 pb-4 text-center text-5xl text-gray-600">Invite</p>
                        </span>
                    </div>
                    <hr />
                    <div className="pt-4 h-24">
                        <div className='flex justify-evenly pb-1'>
                        </div>
                        <div className='flex flex-col text-center'>
                            <h4 className="text-xs text-gray-700">User since: {creation}</h4>
                        </div>
                    </div>
                </div>
            </a>
        )
    });


    return(
        <>
            <div className='flex justify-center h-10' >
                <input value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)} className='w-96 ml-2 m-0 p-1 rounded text-black' placeholder='Find other People' id='userSearch' type="text" />
            </div>

            <div className='text-center mt-10 mr-14 ml-14'>
                <h1>Search Result</h1>
            </div>
            <div  className="grid grid-cols-4 gap-4 border-8 mr-14 ml-14  mb-14  p-8">
                {foundPeople}
            </div>

            <div className='text-center mt-0 mr-14 ml-14'>
                <h1>Friends</h1>
            </div>
            <div  className="grid grid-cols-4 gap-4 border-8 mr-14 ml-14  mb-14  p-8">
                {YourFriends}
            </div>

            <div className='text-center mt-0 mr-14 ml-14'>
                <h1>peopleYouInvited</h1>
            </div>
            <div  className="grid grid-cols-4 gap-4 border-8 mr-14 ml-14  mb-14  p-8">
                {peopleYouInvited}
            </div>

            <div className='text-center mt-0 mr-14 ml-14'>
                <h1>Accept this Requests</h1>
            </div>
            <div  className="grid grid-cols-4 gap-4 border-8 mr-14 ml-14  mb-14  p-8">
                {AcceptInvitation}
            </div>
        </>


    )
}

export default UserConnection;