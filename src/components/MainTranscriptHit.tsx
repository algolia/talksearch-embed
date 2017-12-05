import { h, Component, FunctionalComponent } from 'preact';
import { Highlight, Snippet } from 'react-instantsearch/dom';
import { SingleHit } from '../App';
import { TranscriptHit } from './MainHits';
import MainHit from './MainHit';
import './MainHit.scss';

// todo: make this small
const Description = ({ hit }) => (
  <Snippet hit={hit} attributeName="videoDescription" tagName="mark" />
);
const Transcripts: FunctionalComponent<{
  transcriptions: TranscriptHit['transcriptions'];
}> = ({ transcriptions }) => (
  <div>
    {transcriptions.map(transcription => (
      <div style={{ textDecoration: 'underline' }} key={transcription.objectID}>
        <Highlight hit={transcription} attributeName="text" tagName="mark" />
      </div>
    ))}
  </div>
);

interface HitProps {
  hit: TranscriptHit;
  index: number;
  onOpenDetail: (videoId: string) => void;
}
export default class MainTranscriptHit extends Component<HitProps, any> {
  openDetail = () => this.props.onOpenDetail(this.props.hit.videoId);

  render() {
    const { hit, index, onOpenDetail } = this.props;
    return (
      <MainHit
        render={({ hit }: { hit: TranscriptHit }) => (
          <span>
            <Description hit={hit} />
            <Transcripts transcriptions={hit.transcriptions} />
            <details style={{ opacity: 0.5 }}>
              <summary>all</summary>
              <pre>{JSON.stringify(hit, null, 2)}</pre>
            </details>
          </span>
        )}
        {...{ hit, index, onOpenDetail }}
      />
    );
  }
}
