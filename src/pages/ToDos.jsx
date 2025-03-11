import React, {useState} from 'react'
import List from "../components/ToDos/List"
import {AddIcon} from "../components/svg/"
import AddItem from "../components/ToDos/Add-item";

const ToDos = () => {

  let [isOpen, setIsOpen] = useState(false);

  const open = () =>{
    setIsOpen(true)
  }
  const close = () => {
    setIsOpen(false)
  }

  return (
    <>
      <div className="max-w-[750px] m-auto relative h-screen">
        <List/>
        <div role='add-btn' onClick={open} className='shadow-lg absolute right-2 bottom-8 h-[50px] w-[50px] bg-[#6C63FF] rounded-full flex items-center justify-center hover:bg-[#534CC2] hover:cursor-pointer hover:border-2 hover:border-[#6C63FF] hover:shadow-[0_0_4px_0_#6C63FF]'>
            <AddIcon/>
        </div>
      </div>
      {isOpen && <AddItem close={close} isOpen={isOpen} data={null} type='add'/>}
    </>
  )
}

export default ToDos
