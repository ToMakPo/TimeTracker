import { useState, useEffect, useRef } from 'react'
import API from '../utils/API'
import moment from 'moment'
import LogRow from './LogRow'

import '../styles/ShiftLog.css'
import FilterButton from './FilterButton'

function ShiftLog({userId}) {
    const [shifts, setShifts] = useState([])
    const [showFilters, setShowFilters] = useState(false)
    const [currentShift, setCurrentShift] = useState(null)

    const startDateFilter = useRef()
    const endDateFilter = useRef()

    useEffect(getShifts, [])

    async function getShifts() {
        const logs = await API.getShiftLogs(userId)
        const logCount = logs.length

        if (logCount == 0) return

        const lastShift = logs[logCount - 1]
        setCurrentShift(lastShift.end === null ? lastShift : null)

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
    }

    function toggleFilters() {
        setShowFilters(!showFilters)
    }

    function startShift() {
        API.addShiftLog(userId, {start: Date.now()})
        setCurrentShift()
        getShifts()
    }
    function endShift() {
        console.log(currentShift._id);
        API.updateShiftLog(userId, currentShift._id, {end: Date.now()})
        setCurrentShift()
        getShifts()
    }
    function addShift() {
        // TODO create add shift options
        setCurrentShift()
        getShifts()
    }

    return (
        <div className='shift-log'>
            <div>
                <h2>Shifts</h2>
                <span id='controls'>
                    {currentShift 
                        ? <button id='end-shift-button' onClick={endShift}>End Shift</button>
                        : <button id='start-shift-button' onClick={startShift}>Start Shift</button>
                    }
                    {/* <button id='add-shift-button' onClick={addShift}>Add Shift</button> */}
                    {/* <FilterButton onClick={toggleFilters}/> */}
                    {showFilters && <span id='shift-filters'>
                        <table>
                            <tbody>
                                <tr><td colSpan={2}>Date Range:</td></tr>
                                <tr>
                                    <td>Start</td>
                                    <td><input type='date' ref={startDateFilter}/></td>
                                </tr>
                                <tr>
                                    <td>End</td>
                                    <td><input type='date' ref={endDateFilter}/></td>
                                </tr>
                            </tbody>
                        </table>
                    </span>}
                </span>
            </div>
            {shifts.length !== 0
                ? <table>
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
                            console.log(entries);
                            return entries.map((entry, i) => i === 0
                                ? <LogRow key={i} {...entry} {...shift}/>
                                : <LogRow key={i} {...entry}/>
                            )
                        })}
                    </tbody>
                </table>
                : <em>-- You have no shifts to display yet. --</em>
            }
        </div>
    )
}

export default ShiftLog