import { h, Component } from 'preact';
import { Highlight, Snippet } from 'react-instantsearch/dom';
import { SingleHit } from '../App';
import { TranscriptHit } from './MainHits';
import './MainHit.scss';

const Speaker = ({ hit }) => (
  <p>
    <Highlight hit={hit} attributeName="speaker" tagName="mark" />
  </p>
);
const Title = ({ hit }) => (
  <h1>
    <Highlight hit={hit} attributeName="videoTitle" tagName="mark" />
  </h1>
);

interface MainProps {
  hit: SingleHit | TranscriptHit;
  index: number;
  onOpenDetail: (
    { videoId, start }: { videoId: string; start?: number }
  ) => void;
  render: ({ hit }: { hit: SingleHit | TranscriptHit }) => JSX.Element;
}
export default class MainHit extends Component<MainProps, void> {
  openDetail = () =>
    this.props.onOpenDetail({ videoId: this.props.hit.videoId });

  render() {
    const { hit, index, render } = this.props;
    // XXX [Tim]: Debug statement to auto-open the first result for ease of styling
    // if (hit.videoId === 'tQ99V7QjEHc') {
    //   this.openDetail();
    // }

    return (
      <article>
        ({index})
        <button onClick={this.openDetail}>
          <img src={hit.videoThumbnails.url} />
        </button>
        <Speaker hit={hit} />
        <Title hit={hit} />
        {render({ hit })}
      </article>
    );
  }
}
