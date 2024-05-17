import {FC, useEffect} from 'react'
import {useLocation} from 'react-router'
import clsx from 'clsx'
import {useLayout} from '../core'
import {DrawerComponent} from '../../assets/ts/components'
import {WithChildren} from '../../helpers'
import '../../../_metronic/layout/components/aside/AsideToolbar.scss'
import { Container } from 'react-bootstrap'

const Content: FC<WithChildren> = ({children}) => {
  const {classes} = useLayout()
  const location = useLocation()
  useEffect(() => {
    DrawerComponent.hideAll()
  }, [location])

  return (
    // <div id='kt_content_container' className={clsx(classes.contentContainerFluid.join(' '))}>
    <Container fluid>
      <div id='kt_content_container' >
        {children}
        
      </div>
    </Container>
  )
}

export {Content}
