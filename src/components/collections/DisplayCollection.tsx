import { Customertype } from '@/server/schema';
import { customerhistory, dcustomerhistory } from '@/types';
import React from 'react'

export default function DisplayCollection({ catchedData }: { catchedData: Customertype[] }) {
    let tdebit = 0;
    let tcredit = 0;
    let history: dcustomerhistory[] = []
    if (catchedData.length > 0) {
        for (let i = 0; i < catchedData.length; i++) {
            tdebit += catchedData[i].totaldebit
            tcredit += catchedData[i].totalcredit
            const parsehistory: customerhistory[] = JSON.parse(catchedData[i].history)
            for (let j = 0; j < parsehistory.length; j++) {
                if (parsehistory[j].amount > 0) {
                    history.push({ ...parsehistory[j], dealerid: catchedData[i].dealerid })
                }
            }
        }
    }
    const dateMaker = (date: Date) => new Date(date)
    return (
        <table className='border w-full'>
            <thead>
                <tr>
                    <td className='px-1 py-1 text-center border-r'>Sl. no</td>
                    <td className='px-1 py-1 border-r'>Date</td>
                    <td className='px-1 py-1 border-r'>DealerId</td>
                    <td className='px-1 py-1 border-r'>Type</td>
                    <td className='px-1 py-1 border-r'>Amount</td>
                    <td className='px-1 py-1 text-center border-r'>Total Debit</td>
                    <td className='px-1 py-1 text-center'>Total Credit</td>
                </tr>
            </thead>
            <tbody>
                {
                    history.map(({ dealerid, amount, date, type }, i) =>
                        <tr key={i}>
                            <td className='px-1 py-1 border-t text-center border-r'>{i + 1}</td>
                            <td className='px-1 py-1 border-t border-r'>{dateMaker(date).getDate()}/{dateMaker(date).getMonth() + 1}/{dateMaker(date).getFullYear()}</td>
                            <td onClick={() => navigator.clipboard.writeText(String(dealerid))} className='px-1 py-1 border-t border-r'>{dealerid}</td>
                            <td className='px-1 py-1 border-t border-r uppercase'>{type}</td>
                            <td className='px-1 py-1 border-t border-r'>{amount}</td>
                            {i == 0 && <td rowSpan={history.length} align='center' className='px-1 border-t py-1 border-r'>{tdebit}</td>}
                            {i == 0 && <td rowSpan={history.length} align='center' className='px-1 border-t py-1'>{tcredit}</td>}
                        </tr>
                    )
                }
            </tbody>
        </table>
    )
}
