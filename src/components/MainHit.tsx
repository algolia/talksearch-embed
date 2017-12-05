import { h, Component } from 'preact';
import { Highlight, Snippet } from 'react-instantsearch/dom';
import { SingleHit } from '../App';
import { TranscriptHit } from './MainHits';
import './MainHit.scss';

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
        <button onClick={this.openDetail}>{render({ hit })}</button>
      </article>
    );
  }
}
