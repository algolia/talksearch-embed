import { h, Component } from 'preact';
import { Highlight, Snippet } from 'react-instantsearch/dom';
import { SingleHit, OpenDetail } from '../App';
import { TranscriptHit } from './MainHits';

const Speaker = ({ hit }) => (
  <div style={{ color: '#3369E7' }} className="f6">
    <Highlight hit={hit} attributeName="speaker" tagName="mark" />
  </div>
);
const Title = ({ hit }) => (
  <h1 className="f5 mt1">
    <Highlight hit={hit} attributeName="title" tagName="mark" />
  </h1>
);

interface MainProps {
  hit: SingleHit | TranscriptHit;
  index: number;
  openDetail: OpenDetail;
  render: ({ hit }: { hit: SingleHit | TranscriptHit }) => JSX.Element;
}
export default class MainHit extends Component<MainProps, void> {
  openDetail = () => {
    const { videoId, description, title, speaker, year } = this.props.hit;
    this.props.openDetail({ videoId, description, title, speaker, year });
  };

  render() {
    const { hit, index, render } = this.props;

    const { thumbnails: { url }, duration, year } = hit;
    return (
      <article className="shadow-0 bg-white br6 pa3 bunting">
        <Speaker hit={hit} />
        <Title hit={hit} />
        <div className="flex mb2">
          <button
            onClick={this.openDetail}
            className="bn bg-transparent pointer pa0 relative f3"
          >
            <span className="absolute icon-play white o-70 ma3" />
            <img src={url} className="br6 shadow-0" />
          </button>
          <div className="ml2">
            <div>
              <div className="f7 o-40 mb1">Duration</div>
              <div>{duration}</div>
            </div>
            <div className="mt4">
              <div className="f7 o-40 mb1">Year</div>
              <div>{year}</div>
            </div>
          </div>
        </div>
        {render({ hit })}
      </article>
    );
  }
}
