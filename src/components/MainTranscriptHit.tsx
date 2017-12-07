import { h, Component, FunctionalComponent } from 'preact';
import { Highlight, Snippet } from 'react-instantsearch/dom';
import secToMin from 'sec-to-min';

import { SingleHit, OpenDetail } from '../App';
import { TranscriptHit, Transcript } from './MainHits';
import MainHit from './MainHit';
import SeekButton from './SeekButton';
import TranscriptMatch from './TranscriptMatch';
import { OnRefine } from './Tags';

const Description = ({ hit }) => (
  <Snippet hit={hit} attributeName="description" tagName="mark" />
);

const Transcripts: FunctionalComponent<{
  transcriptions: { [objectID: string]: Transcript };
  openDetail: (start?: number) => void;
}> = ({ transcriptions, openDetail }) => (
  <div className="f6">
    {Object.entries(transcriptions).map(
      ([objectID, transcription]) =>
        transcription && (
          <div key={objectID} className="mt2 flex items-center">
            <SeekButton
              start={transcription.start}
              onClick={() => openDetail(transcription.start)}
            />
            <TranscriptMatch hit={transcription} />
          </div>
        )
    )}
  </div>
);

interface HitProps {
  hit: TranscriptHit;
  index: number;
  onRefine: OnRefine;
  openDetail: OpenDetail;
}
export default class MainTranscriptHit extends Component<HitProps, any> {
  openDetail = start => {
    const {
      videoId,
      description,
      title,
      speaker,
      year,
      indexName,
    } = this.props.hit;
    this.props.openDetail({
      videoId,
      description,
      title,
      speaker,
      year,
      indexName,
      start,
    });
  };

  render() {
    const { hit, index, onRefine, openDetail } = this.props;
    return (
      <MainHit
        render={({ hit }: { hit: TranscriptHit }) => (
          <div>
            <div className="f6 fw3 break-words">
              <Description hit={hit} />
            </div>
            <Transcripts
              transcriptions={hit.transcriptions}
              openDetail={this.openDetail}
            />
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
