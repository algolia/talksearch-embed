import { h, Component } from 'preact';
import Pinboard from '@haroenv/react-pinboard';
import { connectInfiniteHits } from 'react-instantsearch/connectors';

import { SingleHit, HighlightMatch } from '../App';
import MainDetailHit from './MainDetailHit';
import MainTranscriptHit from './MainTranscriptHit';

export interface TranscriptHit extends SingleHit {
  transcriptions: {
    text: string;
    _highlightResult: {
      text: HighlightMatch;
    };
  }[];
}

function hasTranscript(hit: TranscriptHit | SingleHit): hit is TranscriptHit {
  return (hit as TranscriptHit).transcriptions !== undefined;
}

const sameVideo = (
  previous: TranscriptHit | SingleHit | void,
  current: TranscriptHit | SingleHit
) => typeof previous !== 'undefined' && previous.videoId === current.videoId;

function transformToTranscripts(hits: SingleHit[]) {
  return hits.reduce<(SingleHit | TranscriptHit)[]>((acc, hit) => {
    const previous = acc[acc.length - 1];

    if (sameVideo(previous, hit)) {
      if (previous._highlightResult.text.matchLevel === 'none') {
        return [...acc];
      }
      console.log('any transcript', hasTranscript(previous));
      const possibleTranscriptions = hasTranscript(previous)
        ? previous.transcriptions
        : [];
      const newHit: TranscriptHit = {
        ...previous,
        transcriptions: [
          ...possibleTranscriptions,
          {
            text: previous.text,
            _highlightResult: {
              text: previous._highlightResult.text,
            },
          },
          {
            text: hit.text,
            _highlightResult: {
              text: hit._highlightResult.text,
            },
          },
        ],
      };
      const firstHits = acc.splice(0, acc.length - 1);
      return [...firstHits, newHit];
    }
    return [...acc, hit];
  }, []);
}

interface InfiniteHit {
  hits: SingleHit[];
  hasMore: boolean;
  refine(): void;
}
interface Props extends InfiniteHit {
  openDetail(videoId: string): void;
}
class Hits extends Component<Props, null> {
  loadMore = () => {
    console.log('click');
    this.props.refine();
  };

  render() {
    const { hasMore, hits: _originalHits, openDetail } = this.props;
    const hits = transformToTranscripts(_originalHits);

    console.log(hits.map(hasTranscript));
    return (
      <div>
        {hits &&
          hits.length > 0 && (
            <Pinboard
              cols={[
                { media: '(min-width: 1000px)', cols: 4 },
                { media: '(min-width: 800px)', cols: 3 },
                { media: '(min-width: 500px)', cols: 2 },
                { media: '', cols: 1 },
              ]}
            >
              {hits.map(
                (hit, index) =>
                  hasTranscript(hit) ? (
                    <MainTranscriptHit
                      key={hit.objectID}
                      hit={hit}
                      index={index}
                      onOpenDetail={openDetail}
                    />
                  ) : (
                    <MainDetailHit
                      key={hit.objectID}
                      hit={hit}
                      index={index}
                      onOpenDetail={openDetail}
                    />
                  )
              )}
            </Pinboard>
          )}
        {/* doesn't work yet because pinboard uses the children */
        /*
          <button onClick={this.loadMore} disabled={!hasMore}>
            Load more
          </button>
          */}
      </div>
    );
  }
}

export default connectInfiniteHits(Hits);
