import {useIntl} from 'react-intl'
import {PageTitle} from '../../../_metronic/layout/core'
import coupon from '../../../_metronic/images/coupon.svg'
import searchIcon from '../../../_metronic/images/searchIcon.svg'
import {Dropdown, Tab, Tabs} from 'react-bootstrap'
import ActiveTable from '../../components/bannerTable'
import InActiveTable from '../../components/bannerTable/inActive'
import Pagenation from '../../components/pagenation'


const AddShop = () => {
  const intl = useIntl()


  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.DASHBOARD'})}</PageTitle>
      {/* <DashboardPage /> */}

      {/* Dashboard Page Html Start */}
      <div>
        sdfgsdfgfdg
      </div>

      {/* Dashboard Page Html End */}
    </>
  )
}

export {AddShop}
