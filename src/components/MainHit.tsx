import { h, Component } from 'preact';
import { Highlight } from 'react-instantsearch/dom';
import { SingleHit } from '../';

const __hit = {
  start: 0,
  dur: '2.39',
  text: 'yes',
  videoId: '8jwGDHHLEpI',
  videoTitle: 'dotSwift 2017 - Drew McCormack - The Value in Trees',
  videoDescription:
    'Filmed at https://2017.dotswift.io on January 27th in Paris. More talks on http://thedotpost.com\n\nSwift introduces new ways to model data through value types like structs and enums. Drew discusses his experiences rewriting the data model of the vector graphics app Sketch to use value trees, and finishes off pondering whether future data modelling frameworks could be based on value trees, rather than entities and relationships. To that end, he also introduces the experimental project Impeller (https://github.com/mentalfaculty/impeller).',
  videoThumbnails: {
    url: 'https://i.ytimg.com/vi/8jwGDHHLEpI/mqdefault.jpg',
    width: 320,
    height: 180,
  },
  videoRanking: 446,
  channel: 'dotconferences',
  objectID: '8jwGDHHLEpI-0',
};

const Speaker = ({ hit }) => (
  // <Highlight hit={hit} attributeName="text" tagName="mark" />
  <p>Bjarne Stroustrup</p>
);
const Title = ({ hit }) => (
  <h1>
    <Highlight hit={hit} attributeName="videoTitle" tagName="mark" />
  </h1>
);
const Description = ({ hit }) => (
  <Highlight hit={hit} attributeName="videoDescription" tagName="mark" />
);
const TranscriptMatch = ({ hit }) => (
  <Highlight hit={hit} attributeName="text" tagName="mark" />
);

interface HitProps {
  hit: SingleHit;
  onOpenDetail: (videoId: string) => void;
}
export default class MainHit extends Component<HitProps, any> {
  openDetail = () => this.props.onOpenDetail(this.props.hit.videoId);

  render() {
    const { hit } = this.props;
    return (
      <article className="ais-InfiniteHits__item">
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
          <hr />
          <TranscriptMatch hit={hit} />
          <details>
            <summary>all</summary>
            <pre>{JSON.stringify(hit, null, 2)}</pre>
          </details>
          <hr />
        </button>
      </article>
    );
  }
}
