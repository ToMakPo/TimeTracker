import { useState, useEffect, useRef } from 'react'
import API from '../utils/API'
import moment from 'moment'
import ReactTooltip from 'react-tooltip'

import '../styles/ShiftLog.css'
import '../styles/Modal.css'
import '../styles/Form.css'
import LogRow from './LogRow'
import FilterButton from './FilterButton'
import CloseButton from './CloseButton'
import RestartButton from './RestartButton'
import Input from './Input'

function ShiftLog({userId}) {
    const locked = useRef(true)
    const [logs, setLogs] = useState([])
    const [shifts, setShifts] = useState([])
    const [showFilters, setShowFilters] = useState(false)
    const [currentLog, setCurrentShift] = useState(null)
    const [modal, setModal] = useState()
    const [toast, setToast] = useState()
    const [values, setValues] = useState({})
    const [breakdown, setBreakdown] = useState('week')

    const startDateFilter = useRef()
    const endDateFilter = useRef()

    moment.updateLocale('en', { week: { dow: 1 }})

    useEffect(async _ => {
        const logs = await API.getShiftLogs(userId)
        setLogs(logs)
    }, [])
    useEffect(getShifts, [logs, breakdown])

    async function getShifts() {
        const logCount = logs.length
        if (logCount == 0) return

        const lastShift = logs[logCount - 1]
        setCurrentShift(lastShift.end === null ? lastShift : null)

        const getBreakdown = {
            all: _ => {
                const shifts = {}

                const totals = {
                    start: 0,
                    end: 0,
                    hours: 0,
                    aveHours: 0
                }
        
                let lastDayIsToday = false
        
                for (const {_id: id, start, end, notes} of logs) {
                    const day = moment(start).startOf('day')
                    const date = moment(day).format('yyyy-MM-DD')
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
                    
                    if (moment(shift.date).isSame(moment(), 'day')) lastDayIsToday = true
                    const sod = shift.entries[0].start
                    totals.start += moment.duration(moment(sod).diff(moment(shift.date))).asHours()
                    if (!lastDayIsToday) {
                        const eod = shift.entries[shift.entries.length - 1].end
                        totals.end += moment.duration(moment(eod).diff(moment(shift.date))).asHours()
                        totals.aveHours += total
                    }
        
                    shift.total = total
                    totals.hours += total
                }

                setShifts(Object.values(shifts))
                
                const dayCount = Object.values(shifts).length
                const values = {
                    aveStart: moment(0).utc().add(totals.start / dayCount, 'hours').format('HH:mm'),
                    aveEnd: moment(0).utc().add(totals.end / (dayCount - lastDayIsToday), 'hours').format('HH:mm'),
                    aveHours: (totals.hours / logCount).toFixed(2).padStart(5, ' '),
                    aveTotal: (totals.aveHours / (dayCount - lastDayIsToday)).toFixed(2).padStart(7, ' '),
                    ttlTotal: (totals.hours).toFixed(2).padStart(7, ' '),
                }
                setValues(values)
                
                locked.current = false
            },
            week: _ => {
                const weeks = {}
                
                let lastDayIsToday = false
                
                for (const {_id: id, start, end, notes} of logs) {
                    const day = moment(start).startOf('day')
                    const date = moment(day).format('yyyy-MM-DD')
                    const hours = moment.duration(moment(end || Date.now()).diff(moment(start))).asHours()
                    const entry = {id, start, end, hours, notes}
                    const weekNumber = day.startOf().format('gggg-ww')

                    if (!(weekNumber in weeks)) {
                        weeks[weekNumber] = {
                            weekNumber,
                            totals: {
                                start: 0,
                                end: 0,
                                hours: 0,
                                aveHours: 0,
                                span: 0
                            },
                            shifts: {}
                        }
                    }

                    const shifts = weeks[weekNumber].shifts

                    if (!(date in shifts)) {
                        shifts[date] = { date, entries: [ entry ] }
                    } else {
                        shifts[date].entries.push(entry)
                    }
                }
                
                const values = {}
                for (const [weekNumber, week] of Object.entries(weeks)) {
                    const totals = week.totals
                    const shifts = week.shifts
                    for (const shift of Object.values(week.shifts)) {
                        let total = 0
                        
                        for (const { hours } of shift.entries) {
                            total += hours
                            totals.span++
                        }
                        
                        if (moment(shift.date).isSame(moment(), 'day')) lastDayIsToday = true
                        const sod = shift.entries[0].start
                        totals.start += moment.duration(moment(sod).diff(moment(shift.date))).asHours()
                        if (!lastDayIsToday) {
                            const eod = shift.entries[shift.entries.length - 1].end
                            totals.end += moment.duration(moment(eod).diff(moment(shift.date))).asHours()
                            totals.aveHours += total
                        }

                        shift.total = total
                        totals.hours += total
                    }
                
                    const dayCount = Object.values(shifts).length
                    console.log(totals.start);
                    const thisWeeksValues = {
                        aveStart: moment(0).utc().add(totals.start / dayCount, 'hours').format('HH:mm'),
                        aveEnd: moment(0).utc().add(totals.end / (dayCount - lastDayIsToday), 'hours').format('HH:mm'),
                        aveHours: totals.hours / totals.span,
                        aveTotal: totals.aveHours / (dayCount - lastDayIsToday),
                        ttlTotal: totals.hours,
                    }
                    console.log(thisWeeksValues);
                    values[weekNumber] = thisWeeksValues
                }

                setShifts(Object.values(weeks))
                setValues(values)
                
                locked.current = false
            }
        }
        
        getBreakdown[breakdown]()
    }

    function toggleFilters() {
        if (locked.current) return; else locked.current = true
        setShowFilters(!showFilters)
    }

    function getLogById(id) {
        const log = id ? logs.find(log => {
            return log._id == id
        }) : null
        return log
    }
    function startShift() {
        addLog({start: Date.now()})
    }
    function endShift() {
        editLog(currentLog._id, {end: Date.now()})
    }
    function addLog(data) {
        if (locked.current) return; else locked.current = true
        API.addShiftLog(userId, data).then(logs => setLogs(logs))
    }
    function editLog(logId, data) {
        if (locked.current) return; else locked.current = true
        API.updateShiftLog(userId, logId, data).then(logs => setLogs(logs))
    }
    function deleteLog(logId) {
        if (locked.current) return; else locked.current = true
        API.deleteShiftLog(userId, logId).then(logs => setLogs(logs))
    }

    function toTimeFormat(hours=0, pad=2) {
        hours = Math.round(hours * 60) / 60
        const h = Math.floor(hours).toString().padStart(pad, ' ')
        const m = Math.round(hours % 1 * 60).toString().padStart(2, '0')
        const time = h + ':' + m
        return time
    }
    
    const getBreakdown = {
        all: _ => {
            return (
                <table>
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
                    <tbody>{
                        shifts.map(({date, entries, total}) => {
                            const shift = {date, total, span: entries.length}
                            return entries.map((entry, i) => {
                                // entry.editLog = _ => setModal(<Modal logId={entry.id}/>)
                                entry.editLog = _ => null
                                entry.toTimeFormat = toTimeFormat
                                return i === 0
                                ? <LogRow key={i} {...entry} {...shift}/>
                                : <LogRow key={i} {...entry}/>
                            })
                        })
                    }</tbody>
                    <tfoot>
                        <tr>
                            <td>{'Average:\n  Total:'}</td>
                            <td>{values.aveStart}</td>
                            <td><span data-tip='Does not include hours for today.'>{values.aveEnd}</span></td>
                            <td><span data-tip='Does not include hours for today.'>{toTimeFormat(values.aveHours)}</span></td>
                            <td></td>
                            <td><span data-tip='Does not include hours for today.'>{toTimeFormat(values.aveTotal, 4)}</span>
                            {'\n' + toTimeFormat(values.ttlTotal, 4)}</td>
                        </tr>
                    </tfoot>
                </table>
            )
        },
        week: _ => {
            return (
                <table>
                    <thead>
                        <tr>
                            <th>Wk</th>
                            <th>Date</th>
                            <th>Start</th>
                            <th>End</th>
                            <th>Hours</th>
                            <th>Notes</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    {
                        shifts.map(({weekNumber, shifts, totals}) => {
                            let weekDisplayed = false
                            return <>
                                <tbody key={weekNumber}>
                                {
                                    Object.values(shifts).map(({date, entries, total}) => {
                                        const shift = {date, total, span: entries.length}
                                        return entries.map((entry, i) => {
                                            // entry.editLog = _ => setModal(<Modal logId={entry.id}/>)
                                            entry.editLog = _ => null
                                            entry.toTimeFormat = toTimeFormat
                                            if (!weekDisplayed) {
                                                entry.weekNumber = weekNumber
                                                entry.weekSpan = totals.span
                                                weekDisplayed = true
                                            }
                                            return i === 0
                                            ? <LogRow key={i} {...entry} {...shift}/>
                                            : <LogRow key={i} {...entry}/>
                                        })
                                    })
                                }
                                {console.log(values[weekNumber])}
                                <tr className='tableTotal'>
                                    <td colSpan={2}>{'Average:\n  Total:'}</td>
                                    <td>{values[weekNumber].aveStart}</td>
                                    <td><span data-tip='Does not include hours for today.'>{values[weekNumber].aveEnd}</span></td>
                                    <td><span data-tip='Does not include hours for today.'>{toTimeFormat(values[weekNumber].aveHours)}</span></td>
                                    <td></td>
                                    <td><span data-tip='Does not include hours for today.'>{toTimeFormat(values[weekNumber].aveTotal, 4)}</span>
                                    {'\n' + toTimeFormat(values[weekNumber].ttlTotal, 4)}</td>
                                </tr>
                                </tbody>
                            </>
                        })
                    }
                </table>
            )
        }
    }

    return (
        <div className='shift-log'>
            <div id='shift-header'>
                <h2>Shifts</h2>
                <span id='controls'>
                    {currentLog 
                        ? <button id='end-shift-button' onClick={endShift}>End Shift</button>
                        : <button id='start-shift-button' onClick={startShift}>Start Shift</button>
                    }
                    {/* <button id='add-shift-button' onClick={_ => setModal(<Modal/>)}>Add Shift</button> */}
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
                    ? getBreakdown[breakdown]()
                    : <em>-- You have no shifts to display yet. --</em>
                }
            </div>
            {modal}
            {toast && <Toast {...toast} setToast={setToast}/>}
            <ReactTooltip effect='solid' multiline={true}/>
        </div>
    )

    function Modal({logId}) {
        const isNew = logId == undefined
        const log = isNew ? {} : getLogById(logId)

        const startDateInput = useRef()
        const endDateInput = useRef()
        const notesInput = useRef()

        function save(event) {
            event.preventDefault()
            const data = {
                start: startDateInput.current.value,
                end: endDateInput.current.value,
                notes: notesInput.current.value,
            }

            if (data.start === '') {
                startDateInput.current.focus()
                setToast({
                    message: 'You need to have a start time.',
                    bgColor: 'FireBrick'
                })
                return
            }

            if (data.end === '') {
                if (currentLog !== null && (isNew || logId !== currentLog.id)) {
                    endDateInput.current.focus()
                    setToast({
                        message: 'You need to have an end time.',
                        bgColor: 'FireBrick'
                    })
                    return
                }
            } else {
                if (data.end <= data.start) {
                    endDateInput.current.focus()
                    setToast({
                        message: 'The end date can not be before the start date.',
                        bgColor: 'FireBrick'
                    })
                    return
                }
            }

            isNew ? addLog(data) : editLog(logId, data)
            setModal()
        }

        function deleteRecord(event) {
            event.preventDefault()
            deleteLog(logId)
            setModal()
        }

        const startDate = log.start ? moment(log.start).format('yyyy-MM-DDTHH:mm') : ''
        const endDate = log.end ? moment(log.end).format('yyyy-MM-DDTHH:mm') : ''

        return (
            <div className='modal-bg'>
                <div className='modal'>
                    <CloseButton onClick={_ => setModal()} />
                    <h2>{isNew ? 'New' : 'Edit'} Shift</h2>
                    <form onSubmit={save}>
                        <Input name='Start' ref={startDateInput} type='datetime-local' defaultValue={startDate}/>
                        <Input name='End' ref={endDateInput} type='datetime-local' defaultValue={endDate} 
                            include={<RestartButton size={12} onClick={_ => endDateInput.current.value = ''}/>}
                        />
                        <Input name='Notes' ref={notesInput} defaultValue={log.notes}/>
                        
                        <div className='button-box'>
                            <button className='bg-accept'>Save</button>
                            {!isNew && <button className='bg-ltgrey' onClick={deleteRecord}>
                                Delete
                            </button>}
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default ShiftLog