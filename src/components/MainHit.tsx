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
  onOpenDetail: (videoId: string) => void;
  render: ({ hit }: { hit: SingleHit | TranscriptHit }) => JSX.Element;
}
export default class MainHit extends Component<MainProps, void> {
  openDetail = () => this.props.onOpenDetail(this.props.hit.videoId);

  render() {
    const { hit, index, render } = this.props;
    return (
      <article>
        ({index})
        <button onClick={this.openDetail}>
          <img src={hit.videoThumbnails.url} />

          <Speaker hit={hit} />
          <Title hit={hit} />
          {render({ hit })}
        </button>
      </article>
    );
  }
}
