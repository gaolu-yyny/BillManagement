import { NavBar, DatePicker } from 'antd-mobile'
import './index.scss'
import classNames from 'classnames'
import { useEffect, useMemo, useState } from 'react'
import dayjs from 'dayjs'
import { useSelector } from 'react-redux'
import _ from 'lodash'
import DailyBill from './component/DayBill'

const Month = () => {
  const billList=useSelector(state=>state.bill.billList)
  

  const monthGroup=useMemo(()=>{
    return _.groupBy(billList,item=>dayjs(item.date).format('YYYY-MM'))
  },[billList])

  
  const [dataVisible,setdataVisble]=useState(false)
  const[currentMonthList,setMonthList]=useState([])
  
  const[currentMonth,setcurrentMonth]=useState(()=>{
    return dayjs().format('YYYY-MM')
  })

  const dayGroup=useMemo(()=>{
    const group= _.groupBy(currentMonthList,item=>dayjs(item.date).format('YYYY-MM-DD'))
    return{
      dayKeys:Object.keys(group),
      group
    }
  },[currentMonthList])

  const dataConfirm=(date)=>{
    setdataVisble(false)
    const monthKey=dayjs(date).format('YYYY-MM')
    setcurrentMonth(monthKey)
    setMonthList(monthGroup[monthKey]||[])
  }

  useEffect(()=>{
    const list=monthGroup[dayjs().format('YYYY-MM')]
    if(list){
      setMonthList(list)
    }
  },[monthGroup])

  const overView=useMemo(()=>{
    if(!currentMonthList) return{income:0,pay:0,total:0}
    const income=currentMonthList.filter(item=>item.type==='income').reduce((a,c)=>a+c.money,0)
    const pay=currentMonthList.filter(item=>item.type==='pay').reduce((a,c)=>a+c.money,0)
    return{
      income,
      pay,
      total:income+pay
    }
  },[currentMonthList])
  return (
    <div className="monthlyBill">
      <NavBar className="nav" backArrow={false}>
        月度收支
      </NavBar>
      <div className="content">
        <div className="header">
          {/* 时间切换区域 */}
          <div className="date" onClick={()=>{setdataVisble(true)}}>
            <span className="text">
              {currentMonth}账单
            </span>
            <span className={classNames('arrow',dataVisible&&'expand')}></span>
          </div>
          {/* 统计区域 */}
          <div className='twoLineOverview'>
            <div className="item">
              <span className="money">{overView.pay}</span>
              <span className="type">支出</span>
            </div>
            <div className="item">
              <span className="money">{overView.income}</span>
              <span className="type">收入</span>
            </div>
            <div className="item">
              <span className="money">{overView.total}</span>
              <span className="type">结余</span>
            </div>
          </div>
          {/* 时间选择器 */}
          <DatePicker
            className="kaDate"
            title="记账日期"
            precision="month"
            visible={dataVisible}
            max={new Date()}
            onCancel={()=>setdataVisble(false)}
            onConfirm={dataConfirm}
            onClose={()=>setdataVisble(false)}
          />
        </div>
        {dayGroup.dayKeys.map(dayKey=>(
          <DailyBill key={dayKey} date={dayKey} billList={dayGroup.group[dayKey]}/>
        ))}
        
      </div>
    </div >
  )
}

export default Month