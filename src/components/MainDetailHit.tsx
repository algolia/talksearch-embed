import { h, Component } from 'preact';
import { Highlight, Snippet } from 'react-instantsearch/dom';
import { SingleHit, OpenDetail } from '../App';
import { TranscriptHit } from './MainHits';
import MainHit from './MainHit';

const Description = ({ hit }) => (
  <Snippet hit={hit} attributeName="description" tagName="mark" />
);

interface HitProps {
  hit: SingleHit;
  index: number;
  openDetail: OpenDetail;
}
export default class MainDetailHit extends Component<HitProps, any> {
  openDetail = () => {
    const { videoId, description, title } = this.props.hit;
    this.props.openDetail({ videoId, description, title });
  };

  render() {
    const { hit, index, openDetail } = this.props;

    return (
      <MainHit
        render={({ hit }: { hit: SingleHit }) => (
          <div className="f6 fw3">
            <Description hit={hit} />
          </div>
        )}
        hit={hit}
        index={index}
        openDetail={openDetail}
      />
    );
  }
}
