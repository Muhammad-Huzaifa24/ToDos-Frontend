import React, {useState} from 'react'
import { EditIcon, TrashIcon } from '../svg'
import {useDeleteTodo, useUpdateTodo} from "../../hooks/useToDos"
import AddItem from './Add-item'
import {showErrorToast, showSuccessToast} from "../../utils/toast-messages"
import queryClient from '../../main';


const Item = ({data}) => {
  
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);

  const {mutate: deleteMutation, isPending: isDeleting} = useDeleteTodo();
  const {mutate: updateMutation, isLoading: isUpdating} = useUpdateTodo();

  const handleDelete = () => {
    deleteMutation(data?._id, {onSuccess: () => {
      queryClient.invalidateQueries(["todos"])
      showErrorToast('Item Deleted') 
    }});
  } 

  const handleUpdate = () => {
    updateMutation(
        { id: data?._id, updatedTodo: { isCompleted: !data?.isCompleted } },
        {onSuccess: () => {
          queryClient.invalidateQueries(["todos"])
          showSuccessToast('Item Updated')
        }}
      );    
  }

  const handleCheckboxChange = () => handleUpdate();
  const openEditModal = () => setIsOpenEditModal(true)
  const closeEditModal = () => setIsOpenEditModal(false)

  return (
    <>
      <div className='flex items-center justify-between'>
        <div className='flex'>
          <input 
            type="checkbox" 
            checked = {data?.isCompleted} name="" id="" 
            onChange={handleCheckboxChange}
            disabled={isUpdating}
            className='w-6.5 h-6.5 rounded-[2px] border-none appearance-none relative checked:border-transparent checked:bg-[#6C63FF] border border-[#6C63FF]' 
          />
          <p className={`ml-4.25 ${data?.isCompleted ? 'line-through text-gray-500' : ''}`}>
            {data?.title}
          </p>
        </div>
        <div className='flex gap-2.5 items-center'>
          <EditIcon onClick={openEditModal}/>
          {/* Show Loader in place of TrashIcon while deleting */}
          {isDeleting ? (
            <div className="w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <TrashIcon className="hover:cursor-pointer" onClick={handleDelete} />
          )}
        </div>
      </div>
      <div className='border my-4.25 border-[#CDCDCD] darkBorder1'></div>
      {isOpenEditModal && <AddItem close={closeEditModal} isOpen={isOpenEditModal} data={data} type='edit'/>}
    </>
  )
}

export default Item
