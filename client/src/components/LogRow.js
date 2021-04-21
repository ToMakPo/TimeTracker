import Moment from 'react-moment'

function LogRow({id, start, end, hours, notes, date, total, span, editLog}) {
    const dateFormat = 'MMM D, yyyy[\n]dddd'
    const timeFormat = 'HH:mm'
    
    return (
        <tr className='log-item' data-log-id={id}>
            {date && <td rowSpan={span || 1}>
                <Moment style={{whiteSpace: "pre"}} format={dateFormat}>{date}</Moment>
            </td>}
            <td onDoubleClick={editLog}><Moment format={timeFormat} date={start}/></td>
            <td onDoubleClick={editLog}>{end && <Moment format={timeFormat}>{end}</Moment>}</td>
            <td onDoubleClick={editLog}>{hours?.toFixed(2).padStart(5, ' ') || ''}</td>
            <td className='log-notes-cell' onDoubleClick={editLog}>{notes}</td>
            {total && <td rowSpan={span || 1}>{total.toFixed(2).padStart(7, ' ')}</td>}
        </tr>
    )
}

export default LogRow