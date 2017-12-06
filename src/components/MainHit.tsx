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
    const { videoId, description, title } = this.props.hit;
    this.props.openDetail({ videoId, description, title });
  };

  render() {
    const { hit, index, render } = this.props;
    // XXX [Tim]: Debug statement to auto-open the first result for ease of styling
    // if (hit.videoId === 'tQ99V7QjEHc') {
    //   this.openDetail();
    // }

    const { thumbnails: { url }, dur: duration } = hit;
    return (
      // todo: bg white
      <article className="shadow-0 bg-white br6 pa3 bunting">
        <Speaker hit={hit} />
        <Title hit={hit} />
        <div className="flex mb2">
          <button
            onClick={this.openDetail}
            className="bn bg-transparent pointer"
          >
            <img src={url} className="br6 shadow-0" />
          </button>
          <div className="ml2">
            <div>
              <div className="f7 o-40 mb1">Duration</div>
              <div>{duration}</div>
            </div>
            <div className="mt4">
              <div className="f7 o-40 mb1">Year</div>
              {/* todo: find the year in index */}
              <div>N/A</div>
            </div>
          </div>
        </div>
        {render({ hit })}
      </article>
    );
  }
}
