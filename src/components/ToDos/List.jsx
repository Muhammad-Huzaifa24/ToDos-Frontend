import React, {useState} from 'react'
import Select from "react-select";
import Item from "./Item"
import NoDataFound from './NoDataFound';
import {ColorSchemeIcon, SearchIcon, SunIcon} from "../svg"
import {useTodos} from "../../hooks/useToDos"
import {customStyles} from "../../utils/select-style"
import {options} from "../../utils/list-options"

const List = ({onClick, isDarkMode}) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const { data } = useTodos(selectedOption?.value === 'All' ? undefined : selectedOption?.value);

    const filteredData = data?.data?.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return (
        <>
            <div role='head-section' className='flex flex-col gap-4.5 items-center'>
                <p className='text-[#252525] sm:text-[26px] text-base font-medium pt-3 text-center darkBackground'>TODO LIST</p>
                <div role='header' id='header' className=' md:mx-0 mx-6 flex items-center  gap-1 flex-wrap'>
                    <div title='Search todos' id='search-todos' role='search-input' className='flex md:w-[590px] min-w-[300px] border border-[#6C63FF] rounded-[5px] relative darkBorder'>
                        <input type="text" 
                            className='text-[#C3C1E5] w-full h-9.5 px-4 sm:text-base text-sm font-medium focus:outline-none focus:ring-[2px] focus:ring-[#6C63FF]/40 rounded-[5px]'
                            placeholder='Search note...'
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            
                        />
                        <SearchIcon className='absolute top-2 right-4'/>
                    </div>
                    <div title='Filter todos' id='select-filter' className="relative w-[110px]">
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
                    <div 
                        title='Switch theme'
                        onClick={onClick} 
                        role='color-scheme' 
                        className='hidden size-9.5 rounded-[5px] bg-[#6C63FF] md:flex items-center justify-center hover:bg-[#5850DD] hover:cursor-pointer hover:shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]'
                    >
                        {isDarkMode 
                            ?   <SunIcon/>
                            :   <ColorSchemeIcon/>
                        }
                    </div>
                </div>
            </div>
            {/* <div className='h-[400px] border'></div> */}
            <div role='body-section' className='pt-7.5 md:w-[520px] px-4 m-auto'>
                <div className={`m-auto overflow-auto h-96 ${isDarkMode ? 'scrollbar-custom-dark' : 'scrollbar-custom'}`}>
                    {filteredData?.length > 0 ? filteredData?.map((item) => (
                        <Item key={item._id} data={item} />
                    )) : (
                        <NoDataFound/>
                    )}
                </div>
            </div>    
        </>
  )
}

export default List