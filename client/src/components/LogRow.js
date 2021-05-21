import Moment from 'react-moment'

function LogRow({id, start, end, hours, notes, date, total, span, editLog, toTimeFormat}) {
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