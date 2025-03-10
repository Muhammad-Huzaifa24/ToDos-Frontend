import React, {useState} from 'react'
import Select from "react-select";
import Item from "./Item"
import NoDataFound from './NoDataFound';
import {ColorSchemeIcon, SearchIcon} from "../svg"
import {useTodos} from "../../hooks/useToDos"
import {customStyles} from "../../utils/select-style"
import {options} from "../../utils/list-options"

const List = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { data } = useTodos(selectedOption?.value === 'All' ? undefined : selectedOption?.value);

  const filteredData = data?.data?.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div>
        <div role='head-section' className='flex  flex-col gap-4.5'>
            <p className='text-[#252525] text-[26px] font-medium pt-10 text-center'>TODO LIST</p>
            <div role='header' className='flex items-center justify-between'>
                <div role='search-input' className='flex w-[595px] border border-[#6C63FF] rounded-[5px] relative'>
                    <input type="text" 
                        className='text-[#C3C1E5] w-full h-9.5 px-4 text-base font-medium focus:outline-none focus:ring-[2px] focus:ring-[#6C63FF]/40 rounded-[5px]'
                        placeholder='Search note...'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <SearchIcon className='absolute top-2 right-4'/>
                </div>
                <div className="relative w-[110px]">
                    <Select
                        value={selectedOption}
                        onChange={setSelectedOption}
                        options={options}
                        styles={customStyles}
                        placeholder={
                            <div className="flex justify-between text-white">
                                <span>{selectedOption ? selectedOption.label : "Select..."}</span>
                            </div>
                        }
                    />
                </div>
                <div role='color-scheme' className='size-9.5 rounded-[5px] bg-[#6C63FF] flex items-center justify-center hover:bg-[#5850DD] hover:cursor-pointer hover:shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]'>
                    <ColorSchemeIcon/>
                </div>     
            </div>
        </div>
        <div role='body-section' className='py-7.5'>
            <div className=' w-[520px] m-auto overflow-auto h-96'>
                {filteredData?.length > 0 ? filteredData?.map((item) => (
                    <Item key={item._id} data={item} />
                )) : (
                    <NoDataFound/>
                )}
            </div>
        </div>
       
    </div>
  )
}

export default List