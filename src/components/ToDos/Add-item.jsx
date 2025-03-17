import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import React, {useState, useEffect} from 'react';
import {useAddTodo, useUpdateTodo} from "../../hooks/useToDos";
import {showSuccessToast, showErrorToast} from "../../utils/toast-messages"
import queryClient from '../../main';

const AddItem = ({ close, isOpen, data, type }) => {  
  const [note, setNote] = useState('');
  const {mutate: addMutation, isPending: isAdding} = useAddTodo();
  const { mutate: updateMutation, isPending: isUpdating } = useUpdateTodo();

  useEffect(() => {
    if (type === 'edit' && data) {
      setNote(data.title);
    } else {
      setNote('');
    }
  }, [data, type]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!note.trim()) {
      showErrorToast('Title is required')
      return;
    }

    const todoData = {
      title: note,
      isCompleted: data?.isCompleted || false,
    };

    if (type === 'edit') {
      updateMutation({ id: data._id, updatedTodo: todoData }, {
        onSuccess: () => {
            queryClient.invalidateQueries(["todos"]);
            showSuccessToast('Item Updated');
            close();
        }
      });
      // showSuccessToast('Item Updated')
      
    } else {
      addMutation(todoData, {
        onSuccess: () => {
            queryClient.invalidateQueries(["todos"]);
            showSuccessToast('Item Added');
            close();
        },
      });
      // showSuccessToast('Item Added')
    }
  };


  return (
    <>
      <Dialog open={isOpen} onClose={close} className="relative z-10 focus:outline-none ">
        {/* Apply custom backdrop styles here */}
        <div
          className={`fixed inset-0 z-10 w-screen overflow-y-auto ${
            isOpen ? 'bg-[#252525]/70' : ''
          }`} // Apply the dark overlay background with 70% opacity when the dialog is open
        >
          <div className="flex min-h-full items-center justify-center">
            <DialogPanel
              transition
              className="sm:w-[500px] w-[300px] sm:rounded-2xl rounded-lg bg-[#F7F7F7] darkBackground  darkBorder px-7.5 py-4.5 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
                <p className="text-center sm:text-2xl text-base font-medium text-[#252525] darkColor">
                    {type === 'add' ? 'Add Item' : 'Edit Item'}              
                </p>
                <form onSubmit={handleSubmit}>
                  <input type="text" 
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      className='sm:w-[440px] w-full text-[#C3C1E5] sm:mt-6.25 mt-5 px-4 text-sm sm:text-base sm:py-2.75 py-2 darkBorder border border-[#6C63FF] rounded-[5px] focus:outline-none'
                      placeholder='Input your note...'
                  />
                  <div className="mt-32 flex items-center w-full justify-between flex-col gap-2 sm:flex-row">
                      <div
                          className='w-full sm:w-auto cursor-pointer px-6.5 font-medium sm:text-lg text-sm h-[38px] flex items-center justify-center  border border-[#6C63FF] rounded-[5px] text-[#6C63FF]'
                          onClick={close}
                      >
                          CANCEL
                      </div>
                      <button
                          disabled={isAdding || isUpdating}
                          type='submit'
                          className='w-full sm:w-auto cursor-pointer px-6.5 font-medium sm:text-lg text-sm h-[38px] flex items-center justify-center border border-[#6C63FF] bg-[#6C63FF] rounded-[5px] text-white'
                      >
                        {(isAdding || isUpdating) ? (
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          'APPLY'
                        )}
                      </button>
                  </div>
                </form>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default AddItem;
