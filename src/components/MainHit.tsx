import { h, Component } from 'preact';
import { Highlight, Snippet } from 'react-instantsearch/dom';
import secToMin from 'sec-to-min';
import { SingleHit, OpenDetail } from '../App';
import { TranscriptHit } from './MainHits';
import Tags, { OnRefine } from './Tags';

const Speaker = ({ hit }) => (
  <span className="f7 bunting b">
    <Highlight hit={hit} attributeName="speaker" tagName="mark" />
  </span>
);
const Title = ({ hit }) => (
  <h1 className="f4 mt1 mb1 bunting lh-title">
    <Highlight hit={hit} attributeName="title" tagName="mark" />
  </h1>
);

interface MainProps {
  hit: SingleHit | TranscriptHit;
  index: number;
  openDetail: OpenDetail;
  onRefine: OnRefine;
  render: ({ hit }: { hit: SingleHit | TranscriptHit }) => JSX.Element;
}
export default class MainHit extends Component<MainProps, void> {
  openDetail = () => {
    const { id, description, title, speaker, year, indexName } = this.props.hit;
    this.props.openDetail({
      id,
      description,
      title,
      speaker,
      year,
      indexName,
    });
  };

  render() {
    const { hit, index, onRefine, render } = this.props;

    const { thumbnails: { url }, duration, year, tags } = hit;
    return (
      <article className="shadow-0 bg-white br6 pa2 bunting">
        <button
          onClick={this.openDetail}
          className="bn bg-transparent pointer pa0 relative f3"
        >
          <span className="absolute icon-play white o-70 ma3" />
          <div
            className="absolute f7 bg-black pa1 ph2 white o-70"
            style="bottom:.6em;right:.2em"
          >
            {secToMin(duration)}
          </div>
          <img src={url} />
        </button>
        <div className="ph2 pb2">
          <Title hit={hit} />
          <div className="mb2">
            <Speaker hit={hit} />
            <span className="f6 o-70"> {year}</span>
          </div>
          <Tags tags={tags} onRefine={onRefine} />
          {render({ hit })}
        </div>
      </article>
    );
  }
}
