import { useState, useEffect } from 'react'
import API from '../utils/API'
import moment from 'moment'
import LogRow from './LogRow'

import '../styles/ShiftLog.css'

function ShiftLog({userId}) {
    const [shifts, setShifts] = useState([])

    useEffect(async _ => {
        const logs = await API.getUserLogs(userId)

        const shifts = {}

        for (const {_id: id, start, end, notes} of logs) {
            const date = moment(start).format('yyyy-MM-DD')
            const hours = moment.duration(moment(end || Date.now()).diff(moment(start))).asHours()
            const entry = {id, start, end, hours, notes}
            if (!(date in shifts)) {
                shifts[date] = { date, entries: [ entry ] }
            } else {
                shifts[date].entries.push(entry)
            }
        }

        for (const shift of Object.values(shifts)) {
            let total = 0

            for (const { hours } of shift.entries) {
                total += hours
            }

            shift.total = total
        }

        setShifts(Object.values(shifts))
    }, [])

    return (
        <table className='shift-log'>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Start</th>
                    <th>End</th>
                    <th>Hours</th>
                    <th>Notes</th>
                    <th>Total</th>
                </tr>
            </thead>

            <tbody>
                {shifts.map(({date, entries, total}) => {
                    const shift = {date, total, span: entries.length}
                    return entries.map((entry, i) => {
                        return i === 0
                        ? <LogRow key={i} {...entry} {...shift}/>
                        : <LogRow key={i} {...entry}/>
                    }
                    )
                })}
            </tbody>
        </table>
    )
}

export default ShiftLog