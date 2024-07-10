import React from 'react'
import { Progress } from 'antd'
const Analytics = ({allTransaction = []}) => {
  const categories = [
    "salary",
    "tip",
    "project",
    "food",
    "movie",
    "bills",
    "medical",
    "fee",
    "tax",
    "other",
  ];
  const totaltransactions = allTransaction.length;
  const totalincometransactions = allTransaction.filter((transaction)=>transaction.type === 'income');
  const totalexpensetransactions = allTransaction.filter((transaction)=>transaction.type === 'expense');
  const totalincomepercent = (totalincometransactions.length)/(totaltransactions)*100;
  const totalexpensepercent = (totalexpensetransactions.length)/(totaltransactions)*100;
  const totalturnover = allTransaction.reduce((acc,transaction)=>acc+transaction.amount,0);

  const totalincometurnover = allTransaction.filter((transaction)=>transaction.type === 'income')
  .reduce((acc,transaction)=>acc+transaction.amount,0);

  const totalexpenseturnover = allTransaction.filter((transaction)=>transaction.type === 'expense')
  .reduce((acc,transaction)=>acc+transaction.amount,0);
  const totalincometurnoverpercent = (totalincometurnover)/(totalturnover)*100;
  const totalexpenseturnoverpercent = (totalexpenseturnover)/(totalturnover)*100;
  return (
    <>
      <div className='row'>
        <div className='col-md-4'>
            <div className='card'>
              <div className='card-header'>
                Total Transactions : {totaltransactions}
              </div>
              <div className='card-body'>
                <h5 className='text-success'>Income:{totalincometransactions.length}</h5>
                <h5 className='text-danger'>Expense:{totalexpensetransactions.length}</h5>
                <div>
                  <Progress type='circle' strokeColor={'green'} className='mx-2' percent={totalincomepercent.toFixed(0)}/>
                  <Progress type='circle' strokeColor={'red'} className='mx-2' percent={totalexpensepercent.toFixed(0)}/>
                </div>
              </div>
            </div>
        </div>
        <div className='col-md-4'>
            <div className='card'>
              <div className='card-header'>
                Total Turnover : {totalturnover}
              </div>
              <div className='card-body'>
                <h5 className='text-success'>Income:{totalincometurnover}</h5>
                <h5 className='text-danger'>Expense:{totalexpenseturnover}</h5>
                <div>
                  <Progress type='circle' strokeColor={'green'} className='mx-2' percent={totalincometurnoverpercent.toFixed(0)}/>
                  <Progress type='circle' strokeColor={'red'} className='mx-2' percent={totalexpenseturnoverpercent.toFixed(0)}/>
                </div>
              </div>
            </div>
        </div>
      </div>
      <div className='row mt-3'>
        <div className='col-md-5'>
          <h4>Categorywise Income</h4>
          {
            categories.map(Category=>{
              const amount = allTransaction.filter(transaction=>transaction.type === 'income' && transaction.Category === Category).reduce((acc,transaction)=>acc+transaction.amount,0);
              return(
                amount > 0 &&(
                <div className='card'>
                  <div className='card-body'>
                    <h5>{Category}</h5>
                    <Progress percent={((amount/totalincometurnover)*100).toFixed(0)}/>
                  </div>
                </div>
                )
              )
            })
          }
        </div>
        <div className='col-md-5'>
          <h4>Categorywise Expense</h4>
          {
            categories.map(Category=>{
              const amount = allTransaction.filter(transaction=>transaction.type === 'expense' && transaction.Category === Category).reduce((acc,transaction)=>acc+transaction.amount,0);
              return(
                amount > 0 &&(
                <div className='card'>
                  <div className='card-body'>
                    <h5>{Category}</h5>
                    <Progress percent={((amount/totalexpenseturnover)*100).toFixed(0)}/>
                  </div>
                </div>
                )
              )
            })
          }
        </div>
      </div>
      
    </>
  )
}

export default Analytics