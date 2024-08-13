import React, { useState } from 'react'
import './Pagenation.scss'
import ArrowLeftIcon from '../Icons/ArrowLeftIcon';
import ArrowRightIcon from '../Icons/ArrowRightIcon';

const Pagination = (props: any) => {

  const pageCount = Math.ceil(props.totalRecord / 10);

  console.log("props.totalRecord>>>>>>>>>>>>>>", props.totalRecord);

  const paginationPage = (page?: any) => {
    props.paginitionClbk(page);
  }

  const previousButton = () => {
    if (props.currentPage > 0) {
      props.paginitionClbk(props.currentPage - 1);
    }
  }

  const forwardButton = () => {
    props.paginitionClbk(props.currentPage + 1)
  }

  console.log("props.pageNumber", props.currentPage)

  return (
    <>
      <div className='inr-pagenation d-flex justify-content-center align-items-center'>
        <div className='main-inr-btns'>
          <div className='next-btn'>
            <button
              onClick={() => {
                previousButton()
              }}
              disabled={props.currentPage === 1}
            >
              <ArrowLeftIcon />
            </button>

            {Array.from({ length: pageCount })
              .fill('')
              .map((_: any, index: any) => {
                return (
                  <span
                    key={index}
                    className={props.currentPage === index + 1 ? 'active' : ''}
                    onClick={(e) => {
                      paginationPage(index + 1)
                    }}
                  >
                    {index + 1}
                  </span>
                )
              })}

            <button
              onClick={() => {
                forwardButton()
              }}
              disabled={props.currentPage === pageCount}
            >
              <ArrowRightIcon />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default React.memo(Pagination);