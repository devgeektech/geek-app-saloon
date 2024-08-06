import { UsersListToolbar } from './ListToolbar'
import { CommonListSearchComponent } from './ListSearchComponent'

const PartnersListHeader = () => {

  return (
    <>
      <div className='card-header border-0 pt-6 justify-content-end'>
        <CommonListSearchComponent />
        <div className='card-toolbar'>
           <UsersListToolbar />
        </div>
      </div>
    </>
  )
}

export { PartnersListHeader }
