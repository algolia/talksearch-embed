import { h } from 'preact';
import secToMin from 'sec-to-min';

const Time = ({ time }: { time: number }) => <span>{secToMin(time)}</span>;
const SeekButton = ({
  start,
  onClick,
}: {
  start: number;
  onClick: () => void;
}) => (
  <button
    className="text mr2 fw3"
    style={{
      width: 36,
      height: 36,
    }}
    onClick={onClick}
  >
    <div className="fla flc ma1 f5">
      <span className="icon-play tac" />
    </div>
    <div className="fln f7 tc">
      <Time time={start} />
    </div>
  </button>
);

export default SeekButton;
