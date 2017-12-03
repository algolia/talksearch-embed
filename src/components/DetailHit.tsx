import { h, Component } from 'preact';
import { Highlight } from 'react-instantsearch/dom';
import secToMin from 'sec-to-min';
import { SingleHit } from '../';

const TranscriptMatch = ({ hit }: { hit: SingleHit }) => (
  <Highlight hit={hit} attributeName="text" tagName="mark" />
);

const Time = ({ time }: { time: number }) => <p>{secToMin(time)}</p>;

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
      <div>
        <button onClick={this.onSeek}>
          <p>▶️</p>
          <Time time={start} />
        </button>
        <TranscriptMatch hit={hit} />
      </div>
    );
  }
}
