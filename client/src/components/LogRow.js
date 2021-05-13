import Moment from 'react-moment'

function toTimeFormat(hours, pad) {
    const h = Math.floor(hours).toString().padStart(pad, ' ')
    const m = Math.round(hours % 1 * 60).toString().padStart(2, '0')
    const time = h + ':' + m
    return time
}

function LogRow({id, start, end, hours, notes, date, total, span, editLog}) {
    const dateFormat = 'yy-MM-DD[\n]dddd'
    const timeFormat = 'HH:mm'
    
    return (
        <tr className='log-item' data-log-id={id}>
            {date && <td rowSpan={span || 1}>
                <Moment style={{whiteSpace: "pre"}} format={dateFormat}>{date}</Moment>
            </td>}
            <td onDoubleClick={editLog}><Moment format={timeFormat} date={start}/></td>
            <td onDoubleClick={editLog}>{end && <Moment format={timeFormat}>{end}</Moment>}</td>
            <td onDoubleClick={editLog}>{toTimeFormat(hours, 2)}</td>
            <td className='log-notes-cell' onDoubleClick={editLog}>{notes}</td>
            {total && <td rowSpan={span || 1}>{toTimeFormat(total, 4)}</td>}
        </tr>
    )
}

export default LogRow