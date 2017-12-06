import { h, Component } from 'preact';
import TranscriptMatch from './TranscriptMatch';
import SeekButton from './SeekButton';
import { SingleHit } from '../App';

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
      <div className="flex mb2 items-center">
        <SeekButton onClick={this.onSeek} start={start} />
        <TranscriptMatch hit={hit} />
      </div>
    );
  }
}
