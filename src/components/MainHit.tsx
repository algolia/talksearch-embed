import { h, Component } from 'preact';
import { Highlight, Snippet } from 'react-instantsearch/dom';
import { SingleHit } from '../App';
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
  <Highlight hit={hit} attributeName="text" tagName="mark" />
);

interface HitProps {
  hit: SingleHit;
  index: number;
  onOpenDetail: (videoId: string) => void;
}
export default class MainHit extends Component<HitProps, any> {
  openDetail = () => this.props.onOpenDetail(this.props.hit.videoId);

  render() {
    const { hit, index } = this.props;
    return (
      <article>
        ({index})
        <button onClick={this.openDetail}>
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
          {/* <TranscriptMatch hit={hit} /> */}
          <details style={{ opacity: 0.5 }}>
            <summary>all</summary>
            <pre>{JSON.stringify(hit, null, 2)}</pre>
          </details>
        </button>
      </article>
    );
  }
}
