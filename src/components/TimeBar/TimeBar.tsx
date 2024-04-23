import './TimeBar.css'
type TimeBarProps = {
    timeInterval: number[],
    intervalIndex: number,
    handleClick: (index: number) => void,
    showIntervalTime?: boolean,
    height?: string
}
const TimeBar = ({ timeInterval, intervalIndex, handleClick, showIntervalTime=false, height='1em' }: TimeBarProps) => {

    const sumOfInterval = timeInterval.reduce((a, b) => a + b, 0);

    return <div className={'timer-elapsed'} style={{height}}>
        {timeInterval.map((x, i) =>
            <div key={i}
                className={((i) < intervalIndex) ? 'grey' : (i === intervalIndex) ? 'active' : ''}
                style={{
                    width: (x / sumOfInterval) * 100 + '%',
                    animationDelay: (1 + i / (4 + i)) + 's'
                }}
                onClick={() => handleClick(i)}
            >
                {showIntervalTime ? x : ''}
                </div>
        )}
    </div>
}
export default TimeBar;