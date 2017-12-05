import { h, Component } from 'preact';
import { Highlight, Snippet } from 'react-instantsearch/dom';
import { SingleHit } from '../App';
import { TranscriptHit } from './MainHits';
import MainHit from './MainHit';
import './MainHit.scss';

// <Highlight hit={hit} attributeName="speaker" tagName="mark" />
const Speaker = ({ hit }) => <p>Bjarne Stroustrup</p>;
const Title = ({ hit }) => (
  <h1>
    <Highlight hit={hit} attributeName="videoTitle" tagName="mark" />
  </h1>
);
const Description = ({ hit }) => (
  <Snippet hit={hit} attributeName="videoDescription" tagName="mark" />
);
const TranscriptMatch = ({ hit }) => (
  <div style={{ fontFamily: 'serif' }}>
    <Highlight hit={hit} attributeName="text" tagName="mark" />
  </div>
);

interface HitProps {
  hit: TranscriptHit;
  index: number;
  onOpenDetail: (videoId: string) => void;
}
export default class MainTranscriptHit extends Component<HitProps, any> {
  openDetail = () => this.props.onOpenDetail(this.props.hit.videoId);

  render() {
    const { hit, index, onOpenDetail } = this.props;
    return (
      <MainHit
        render={({ hit }: { hit: TranscriptHit }) => (
          <span>
            <img src={hit.videoThumbnails.url} />
            <a
              href={`https://youtube.com/watch?v=${hit.videoId}&t=${Math.floor(
                hit.start
              )}s`}
              target="_blank"
            >
              original
            </a>
            <Speaker hit={hit} />
            <Title hit={hit} />
            <Description hit={hit} />
            <TranscriptMatch hit={hit} />
            <details style={{ opacity: 0.5 }}>
              <summary>all</summary>
              <pre>{JSON.stringify(hit, null, 2)}</pre>
            </details>
          </span>
        )}
        {...{ hit, index, onOpenDetail }}
      />
    );
  }
}
