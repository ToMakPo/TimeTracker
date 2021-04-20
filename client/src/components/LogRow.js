import Moment from 'react-moment'

function LogRow({id, start, end, hours, notes, date, total, span}) {
    const dateFormat = 'MMM DD, yyyy[\n]dddd'
    const timeFormat = 'HH:mm'
    
    return (
        <tr className='log-item' data-log-id={id}>
            {date && <td rowSpan={span || 1}><Moment style={{whiteSpace: "pre"}} format={dateFormat}>{date}</Moment></td>}
            <td><Moment format={timeFormat} date={start}/></td>
            <td>{end && <Moment format={timeFormat}>{end}</Moment>}</td>
            <td>{hours?.toFixed(2) || ''}</td>
            <td>{notes}</td>
            {total && <td rowSpan={span || 1}>{total.toFixed(2)}</td>}
        </tr>
    )

    function Modal(data) {
        
    }
}

export default LogRow