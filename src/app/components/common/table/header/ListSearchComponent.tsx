/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from 'react-redux';
// import { commonSwtichCases } from '../../../../../../../utils/shared';
import { useEffect, useState } from 'react';
import { KTIcon } from '../../../../../_metronic/helpers';
// import { SIDEBAR } from '../../../../../../../utils/const';

const CommonListSearchComponent = () => {
  const sharedActions = useSelector((state: any) => state.sharedActions);
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState('');


  useEffect(() => {
    if (searchValue) {
      searchQuery(searchValue);
    }
  }, [searchValue])

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const searchQuery = (searchValue) => {
    // commonSwtichCases(sharedActions.id, searchValue, dispatch);
  };

  return (
    <div className='card-title'>
       {<div className='searchbar d-flex align-items-center position-relative my-1'>
        <input
          type='text'
          data-kt-user-table-filter='search'
          className='form-control form-control-solid w-200px ps-14'
          placeholder='Search...'
          // value={searchTerm}
          onChange={handleSearchChange}
        />
        
      </div>} 
      {/* {(sharedActions.id !== SIDEBAR.SESSION && sharedActions.id !== SIDEBAR.TRANSACTION) && <div className='d-flex align-items-center position-relative my-1'>
        <KTIcon iconName='magnifier' className='fs-1 position-absolute ms-6' />
        <input
          type='text'
          data-kt-user-table-filter='search'
          className='form-control form-control-solid w-200px ps-14'
          placeholder='Search...'
          // value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>} */}
    </div>
  )
}

export { CommonListSearchComponent }
