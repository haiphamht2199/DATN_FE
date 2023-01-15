import React from 'react'
import Banner from '../component/homePage/Banner'
import HeaderHomePage from '../component/homePage/HeaderHomePage'
import ListClassHomePage from '../component/homePage/ListClassHomePage'

function HomePage() {
 return (
  <div className='container_homePage'>
   <div className='header_homePage'>
    <HeaderHomePage />
   </div>
   <Banner />
   <ListClassHomePage />
  </div>
 )
}

export default HomePage