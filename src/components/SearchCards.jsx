import React from 'react'
import { useNavigate } from 'react-router-dom';

const SearchCards = ({data}) => {
    const navigate = useNavigate();
    console.log(data)
    const {avatar, userName, _id, email} = data;
  return (
    <div className='bg-neutral-800 cursor-pointer flex justify-around gap-10 p-3 m-4 rounded-[20px]' onClick={() => navigate(`/getProfile/${_id}`)}>
        <div className='rounded-full overflow-hidden'>
            <img src={avatar} alt="avatar" className='w-[80px] h-[80px] object-cover'/>
        </div>
        <div>
            <h1 className='font-bold text-3xl'>{userName}</h1>
            <p>{email}</p>
        </div>
    </div>
  )
}

export default SearchCards