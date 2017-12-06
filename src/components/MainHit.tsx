import { h, Component } from 'preact';
import { Highlight, Snippet } from 'react-instantsearch/dom';
import { SingleHit, OpenDetail } from '../App';
import { TranscriptHit } from './MainHits';

const Speaker = ({ hit }) => (
  <p>
    <Highlight hit={hit} attributeName="speaker" tagName="mark" />
  </p>
);
const Title = ({ hit }) => (
  <h1 className="f4">
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

    return (
      <article className="shadow-0 bg-titan-white br6 pa3 bunting">
        <Speaker hit={hit} />
        <Title hit={hit} />
        <div>
          <button
            onClick={this.openDetail}
            className="bn bg-transparent pointer"
          >
            <img src={hit.thumbnails.url} className="br6 shadow-0" />
          </button>
        </div>
        {render({ hit })}
      </article>
    );
  }
}
