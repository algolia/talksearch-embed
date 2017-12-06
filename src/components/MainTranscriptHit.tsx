import { h, Component, FunctionalComponent } from 'preact';
import { Highlight, Snippet } from 'react-instantsearch/dom';
import secToMin from 'sec-to-min';

import { SingleHit, OpenDetail } from '../App';
import { TranscriptHit, Transcript } from './MainHits';
import MainHit from './MainHit';
import { SeekButton } from './DetailHit';

// todo: make this small
const Description = ({ hit }) => (
  <Snippet hit={hit} attributeName="description" tagName="mark" />
);

const Transcripts: FunctionalComponent<{
  transcriptions: { [objectID: string]: Transcript };
  openDetail: (start?: number) => void;
}> = ({ transcriptions, openDetail }) => (
  <div>
    {Object.entries(transcriptions).map(
      ([objectID, transcription]) =>
        transcription && (
          <div key={objectID} className="ma1 flex items-center">
            <SeekButton
              start={transcription.start}
              onClick={() => openDetail(transcription.start)}
            />
            {/* todo extract and reuse */}
            <div>
              …<Highlight
                hit={transcription}
                attributeName="text"
                tagName="mark"
              />…
            </div>
          </div>
        )
    )}
  </div>
);

interface HitProps {
  hit: TranscriptHit;
  index: number;
  openDetail: OpenDetail;
}
export default class MainTranscriptHit extends Component<HitProps, any> {
  openDetail = start => {
    const { videoId, description, title } = this.props.hit;
    this.props.openDetail({ videoId, description, title, start });
  };

  render() {
    const { hit, index, openDetail } = this.props;
    return (
      <MainHit
        render={({ hit }: { hit: TranscriptHit }) => (
          <span className="">
            <div className="f6 fw3">
              <Description hit={hit} />
            </div>
            <div className="f6 mt3">
              <Transcripts
                transcriptions={hit.transcriptions}
                openDetail={this.openDetail}
              />
            </div>
          </span>
        )}
        hit={hit}
        index={index}
        openDetail={openDetail}
      />
    );
  }
}
