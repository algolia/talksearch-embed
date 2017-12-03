import { h, Component } from 'preact';
import {
  InstantSearch,
  Hits,
  SearchBox,
  PoweredBy,
  Configure,
} from 'react-instantsearch/dom';
import { connectMenu } from 'react-instantsearch/connectors';
import YouTube from 'react-youtube';

import { SingleHit } from '../';
import DetailHit from './DetailHit';

const VirtualMenu = connectMenu(() => null);
const RestrictToVideo = ({ videoId }: { videoId: string }) => (
  <VirtualMenu attributeName="videoId" defaultRefinement={videoId} />
);

interface Props {
  videoId: string;
  open: boolean;
  start?: number;
  onCloseDetail: () => void;
  indexName: string;
}
export default class Detail extends Component<Props, any> {
  player = null;
  onSeek = (time: number) => {
    this.player.seekTo(time);
  };
  onReady = e => {
    this.player = e.target;
  };

  render() {
    const { videoId, open, onCloseDetail, start = 0 } = this.props;
    return (
      open && (
        <div>
          <button aria-label="close" onClick={onCloseDetail}>
            x
          </button>
          <YouTube
            videoId={videoId}
            opts={{
              height: '390',
              width: '640',
              playerVars: {
                autoplay: 1,
                playsinline: 1,
                rel: 0,
                cc_load_policy: 1,
                start,
              },
            }}
            onReady={this.onReady}
          />
          <InstantSearch
            appId="FOQUAZ6YNS"
            apiKey="72ee3a317835b8618eda01c6fcc88f77"
            indexName="dotconferences"
          >
            <RestrictToVideo videoId={videoId} />
            <SearchBox />
            <Hits
              hitComponent={({ hit }: { hit: SingleHit }) => (
                <DetailHit hit={hit} onSeek={this.onSeek} />
              )}
            />
          </InstantSearch>
        </div>
      )
    );
  }
}
