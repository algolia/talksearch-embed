import { h, Component } from 'preact';
import { Highlight, Snippet } from 'react-instantsearch/dom';
import { SingleHit } from '../App';
import { TranscriptHit } from './MainHits';
import MainHit from './MainHit';
import './MainHit.scss';

const Description = ({ hit }) => (
  <Snippet hit={hit} attributeName="videoDescription" tagName="mark" />
);

interface HitProps {
  hit: SingleHit;
  index: number;
  onOpenDetail: (videoId: string) => void;
}
export default class MainDetailHit extends Component<HitProps, any> {
  openDetail = () => this.props.onOpenDetail(this.props.hit.videoId);

  render() {
    const { hit, index, onOpenDetail } = this.props;

    return (
      <MainHit
        render={({ hit }: { hit: SingleHit }) => (
          <div>
            <Description hit={hit} />

            <details style={{ opacity: 0.5 }}>
              <summary>all</summary>
              <pre>{JSON.stringify(hit, null, 2)}</pre>
            </details>
          </div>
        )}
        {...{ hit, index, onOpenDetail }}
      />
    );
  }
}
