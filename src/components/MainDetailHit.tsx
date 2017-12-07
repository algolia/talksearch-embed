import { h, Component } from 'preact';
import { Highlight, Snippet } from 'react-instantsearch/dom';
import { SingleHit, OpenDetail } from '../App';
import { TranscriptHit } from './MainHits';
import MainHit from './MainHit';
import { OnRefine } from './Tags';

const Description = ({ hit }) => (
  <Snippet hit={hit} attributeName="description" tagName="mark" />
);

interface HitProps {
  hit: SingleHit;
  index: number;
  onRefine: OnRefine;
  openDetail: OpenDetail;
}
export default class MainDetailHit extends Component<HitProps, any> {
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
    const { hit, index, onRefine, openDetail } = this.props;

    return (
      <MainHit
        render={({ hit }: { hit: SingleHit }) => (
          <div className="f6 fw3 break-words">
            <Description hit={hit} />
          </div>
        )}
        hit={hit}
        index={index}
        openDetail={openDetail}
        onRefine={onRefine}
      />
    );
  }
}
