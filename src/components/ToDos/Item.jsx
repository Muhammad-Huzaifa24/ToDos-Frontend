import React, {useState} from 'react'
import { EditIcon, TrashIcon } from '../svg'
import {useDeleteTodo, useUpdateTodo} from "../../hooks/useToDos"
import AddItem from './Add-item'
import {showErrorToast, showSuccessToast} from "../../utils/toast-messages"

const Item = ({data}) => {
  
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const {mutate: deleteMutation} = useDeleteTodo();
  const {mutate: updateMutation} = useUpdateTodo();

  const handleDelete = () => {
    deleteMutation(data?._id);
    showErrorToast('Item Deleted') 
  } 
  const handleUpdate = () => {
    updateMutation({id: data?._id, updatedTodo: {isCompleted: !data?.isCompleted}});
    showSuccessToast('Item Updated')
  }
  const handleCheckboxChange = () => {
    handleUpdate();
  };
  const openEditModal = () =>{
      setIsOpenEditModal(true)
  }
  const closeEditModal = () => {
      setIsOpenEditModal(false)
  }
    return (
    <>
      <div className='flex items-center justify-between'>
        <div className='flex'>
          <input type="checkbox" checked = {data?.isCompleted} name="" id="" 
            onChange={handleCheckboxChange}
            className='w-6.5 h-6.5 rounded-[2px] border-none appearance-none relative checked:border-transparent checked:bg-[#6C63FF] border border-[#6C63FF]' 
          />
          <p className='ml-4.25'>{data?.title}</p>
        </div>
        <div className='flex gap-2.5 items-center'>
          <EditIcon onClick={openEditModal}/>
          <TrashIcon className="hover:cursor-pointer" onClick={handleDelete}/>
        </div>
      </div>
      <div className='border my-4.25 border-[#CDCDCD]'></div>
      {isOpenEditModal && <AddItem close={closeEditModal} isOpen={isOpenEditModal} data={data} type='edit'/>}
    </>
  )
}

export default Item
