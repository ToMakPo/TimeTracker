import { useState, useEffect, useRef } from 'react'
import API from '../utils/API'
import moment from 'moment'

import '../styles/ShiftLog.css'
import LogRow from './LogRow'
import FilterButton from './FilterButton'

function ShiftLog({userId}) {
    const locked = useRef(true)
    const [logs, setLogs] = useState([])
    const [shifts, setShifts] = useState([])
    const [showFilters, setShowFilters] = useState(false)
    const [currentShift, setCurrentShift] = useState(null)

    const startDateFilter = useRef()
    const endDateFilter = useRef()

    useEffect(async _ => {
        const logs = await API.getShiftLogs(userId)
        setLogs(logs)
    }, [])
    useEffect(getShifts, [logs])

    async function getShifts() {
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
        
        locked.current = false
    }

    function toggleFilters() {
        if (locked.current) return; else locked.current = true
        setShowFilters(!showFilters)
    }

    function startShift() {
        if (locked.current) return; else locked.current = true
        API.addShiftLog(userId, {start: Date.now()}).then(logs => setLogs(logs))
    }
    function endShift() {
        if (locked.current) return; else locked.current = true
        API.updateShiftLog(userId, currentShift._id, {end: Date.now()}).then(logs => setLogs(logs))
    }
    function addShift() {
        if (locked.current) return; else locked.current = true
        // TODO create add shift options
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
            <div id='shift-table'>
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
        </div>
    )
}

export default ShiftLog