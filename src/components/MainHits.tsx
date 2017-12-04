import { h, Component } from 'preact';
import MasonryInfiniteScroller from 'react-masonry-infinite';
import Pinboard from 'react-pinboard';
import { connectInfiniteHits } from 'react-instantsearch/connectors';

import { SingleHit } from '../App';
import MainHit from './MainHit';

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
    const { hasMore, hits, openDetail } = this.props;
    // const withTranscripts = hits.reduce(() => {}, []);
    console.log(hits.map(h => h.videoTitle || ''));
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
              {hits.map((hit, index) => (
                <MainHit
                  key={hit.objectID}
                  hit={hit}
                  index={index}
                  onOpenDetail={openDetail}
                />
              ))}
            </Pinboard>
          )}
        {/* doesn't work yet because pinboard uses the children */
        /* <button onClick={this.loadMore} disabled={!hasMore}>
          Load more
        </button> */}
      </div>
    );
  }
}

export default connectInfiniteHits(Hits);
