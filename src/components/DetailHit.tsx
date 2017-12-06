import { h, Component } from 'preact';
import { Highlight } from 'react-instantsearch/dom';
import secToMin from 'sec-to-min';
import { SingleHit } from '../App';

const TranscriptMatch = ({ hit }: { hit: SingleHit }) => (
  <Highlight hit={hit} attributeName="text" tagName="mark" />
);

const Time = ({ time }: { time: number }) => <span>{secToMin(time)}</span>;

interface HitProps {
  hit: SingleHit;
  onSeek(start: number): void;
}
export default class Hit extends Component<HitProps, any> {
  onSeek = () => this.props.onSeek(this.props.hit.start - 1);

  render() {
    const { hit } = this.props;
    const { start } = hit;
    return (
      <div className="flrnw mb2">
        <button className="text mr2" onClick={this.onSeek}>
          <div className="fla flc ma f4">
            <span className="icon-play tac" />
          </div>
          <div className="fln f6 tc">
            <Time time={start} />
          </div>
        </button>
        <div className="fla flcnw flccv">
          <div className="fln f6">
            <TranscriptMatch hit={hit} />
          </div>
        </div>
      </div>
    );
  }
}
