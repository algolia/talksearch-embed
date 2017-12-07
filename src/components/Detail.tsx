import { h, Component } from 'preact';
import {
  InstantSearch,
  Hits,
  SearchBox,
  PoweredBy,
  Configure,
  Pagination,
} from 'react-instantsearch/dom';
import { connectMenu } from 'react-instantsearch/connectors';
import YouTube from 'react-youtube';

import { SingleHit, Metadata } from '../App';
import DetailHit from './DetailHit';

const VirtualMenu = connectMenu(() => null);
const RestrictToVideo = ({ videoId }: { videoId: string }) => (
  <VirtualMenu attributeName="videoId" defaultRefinement={videoId} />
);

interface Props {
  videoId: string;
  title: string;
  description: string;
  speaker: string;
  year: number;
  open: boolean;
  start?: number;
  onCloseDetail: () => void;
  indexName: string;
  metadata: Metadata;
}
export default class Detail extends Component<Props, any> {
  player = null;
  onSeek = (time: number) => {
    this.player.seekTo(time);
  };
  onReady = e => {
    this.player = e.target;
    this.player.seekTo(this.props.start || 0);
  };

  render() {
    const {
      videoId,
      open,
      start = 0,
      title,
      description,
      speaker,
      year,
      onCloseDetail,
      indexName,
      metadata: { name, avatar },
    } = this.props;
    return (
      open && (
        <div className="">
          {/* todo: responsive lol */}
          <div className="w-100 bg-white shadow-0 pt1 pt3 bunting">
            <div className="mb2 flrnw h3 ph1 ph3-ns">
              {avatar && (
                <div className="fln mr3" style={{ width: 64 }}>
                  <img src={avatar} />
                </div>
              )}
              <div className="fla flcnw flspa">
                <div className="fln f7 f5-m f4-ns">
                  <span className="mulberry pr2">{speaker} -</span>
                  {name}
                  <span className="mulberry pl2">- {year}</span>
                </div>
                <div className="fln f5 f3-ns b ellipsis">{title}</div>
              </div>
              <div className="fln flcnw">
                <button
                  className="fln mba pointer bg-transparent bw0 pa0"
                  onClick={onCloseDetail}
                >
                  <span className="dn db-ns black-50 f5">
                    back to search <span className="icon-search" />
                  </span>
                  <span className="dn-ns db b bunting tr mt2">Back</span>
                </button>
              </div>
            </div>

            <div className="flex flex-wrap flex-nowrap-l mb3 ph3-ns">
              <div className="fln w-100 w-60-m w-60-l pr3-ns">
                <YouTube
                  videoId={videoId}
                  opts={{
                    origin:
                      typeof window !== 'undefined'
                        ? window.location.origin
                        : 'https://talksearch-embed.algolia.com',
                    enablejsapi: '1',
                    width: '100%',
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
                <div className="mt3 lh-copy f6">{description}</div>
              </div>

              <div className="fln w-100 w-40-m w-40-l mt3 mt0-ns ph1 ph0-ns">
                <InstantSearch
                  appId="FOQUAZ6YNS"
                  apiKey="72ee3a317835b8618eda01c6fcc88f77"
                  indexName={`${indexName}-detail`}
                >
                  <RestrictToVideo videoId={videoId} />
                  <Configure
                    attributesToRetrieve={['title', 'start']}
                    hitsPerPage={5}
                  />
                  <SearchBox />
                  <div className="mt2">
                    <Hits
                      hitComponent={({ hit }: { hit: SingleHit }) => (
                        <DetailHit hit={hit} onSeek={this.onSeek} />
                      )}
                    />
                    <div className="tc dn db-ns">
                      <Pagination showFirst={false} pagesPadding={0} />
                    </div>
                  </div>
                </InstantSearch>
              </div>
            </div>

            <div className="dn flex-ns flex-nowrap-ns mb3 ph3 dn db-ns">
              <div className="fla tl royal-blue b f4 flrnw flrcv">
                <div className="fln tl">
                  <span className="dejavu black">{'< /> '}</span>
                  embed this talk on your webpage
                </div>
              </div>
              <div className="fln w-20 flc">
                <img src="/img/search-by-algolia.svg" />
              </div>
            </div>

            <div className="dn flex-ns flex-nowrap b--black-30 pv3 ph5">
              <div className="fla flrnw">
                <div className="fln w-30 pr4 flrnw flrcv">
                  <img className="fln" src="/img/talksearch.svg" />
                </div>
                <div className="fln w-70 black-30 lh-copy f5 flc">
                  <div className="fla">
                    A tool to help conference organizers make all their videos
                    searchable & interactive.
                    <a
                      href="https://community.algolia.com/talksearch"
                      className="link b royal-blue pl2"
                    >
                      Visit the TalkSearch project
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    );
  }
}
