import { h, Component } from 'preact';
import { connectInfiniteHits } from 'react-instantsearch/connectors';

import { SingleHit, HighlightMatch, OpenDetail, SnippetMatch } from '../App';
import MainDetailHit from './MainDetailHit';
import MainTranscriptHit from './MainTranscriptHit';
import { OnRefine } from './Tags';
import './MainHits.scss';

export interface Transcript {
  objectID: string;
  start: number;
  text: string;
  _highlightResult: {
    text: HighlightMatch;
  };
  _snippetResult: {
    text: SnippetMatch;
  };
}
export interface TranscriptHit extends SingleHit {
  transcriptions: { [objectID: string]: Transcript };
}

function hasTranscript(hit: TranscriptHit | SingleHit): hit is TranscriptHit {
  return (
    (hit as TranscriptHit).transcriptions !== undefined &&
    Object.keys((hit as TranscriptHit).transcriptions).length > 0
  );
}

function transcriptIfRelevant(
  hit: SingleHit | TranscriptHit
): Transcript | null {
  try {
    const matchLevel =
      hit._snippetResult && hit._snippetResult.text
        ? hit._snippetResult.text.matchLevel
        : hit._highlightResult &&
          hit._highlightResult.text &&
          hit._highlightResult.text.matchLevel;
    if (matchLevel !== 'none') {
      const { objectID, start, text, id } = hit;
      return {
        objectID,
        start,
        text,
        _highlightResult: {
          text: hit._highlightResult.text,
        },
        _snippetResult: {
          text: hit._snippetResult.text,
        },
      };
    }
    return null;
  } catch (_) {
    return null;
  }
}

function transformToTranscripts(hits: SingleHit[]) {
  return hits.reduce<(SingleHit | TranscriptHit)[]>((acc, hit) => {
    if (hit._distinctSeqID === 0 || typeof hit._distinctSeqID === 'undefined') {
      // first or no distinct, simply push
      const hitTranscriptions = transcriptIfRelevant(hit);
      return [
        ...acc,
        {
          ...hit,
          transcriptions: {
            ...hitTranscriptions
              ? { [hitTranscriptions.objectID]: hitTranscriptions }
              : {},
          },
        },
      ];
    } else if (hit._distinctSeqID > 0) {
      const previous = acc[acc.length - 1];
      const firstHits = acc.splice(0, acc.length - 1);

      const lastTranscriptions = {
        text: hit.text,
        _highlightResult: {
          text: hit._highlightResult.text,
        },
        _snippetResult: {
          text: hit._snippetResult.text,
        },
      };

      const previousTranscriptions = transcriptIfRelevant(previous);
      const hitTranscriptions = transcriptIfRelevant(hit);
      return [
        // all of the hits minus the last one
        ...firstHits,
        {
          // the properties of the last one
          ...previous,
          transcriptions: {
            ...hasTranscript(previous) ? previous.transcriptions : {},
            ...previousTranscriptions
              ? { [previousTranscriptions.objectID]: previousTranscriptions }
              : {},
            ...hitTranscriptions
              ? { [hitTranscriptions.objectID]: hitTranscriptions }
              : {},
          },
        },
      ];
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
  openDetail: OpenDetail;
  onRefine: OnRefine;
}
class Hits extends Component<Props, null> {
  loadMore = () => {
    console.log('click');
    this.props.refine();
  };

  render() {
    const { hasMore, hits: _originalHits, onRefine, openDetail } = this.props;
    const hits = transformToTranscripts(_originalHits);

    return (
      <div>
        {hits &&
          hits.length > 0 && (
            <div className="hits-container">
              {hits.map(
                (hit, index) =>
                  hasTranscript(hit) ? (
                    <MainTranscriptHit
                      key={hit.objectID}
                      hit={hit}
                      index={index}
                      onRefine={onRefine}
                      openDetail={openDetail}
                    />
                  ) : (
                    <MainDetailHit
                      key={hit.objectID}
                      hit={hit}
                      index={index}
                      onRefine={onRefine}
                      openDetail={openDetail}
                    />
                  )
              )}
            </div>
          )}
        <div className="ma3 tc">
          <button
            onClick={this.loadMore}
            disabled={!hasMore}
            className="ba bw1 b--black br-pill black bg-transparent pa2 pointer"
          >
            Load more
          </button>
        </div>
      </div>
    );
  }
}

export default connectInfiniteHits(Hits);
