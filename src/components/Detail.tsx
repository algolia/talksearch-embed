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
      metadata: { name, imageURL },
    } = this.props;
    return (
      open && (
        <div className="">
          <div className="absolute-center-horizontal z-max top-1-ns w-90 w-80-m w-60-l bg-white shadow-0 br6 ba pt3 bunting b--gray">
            <div className="mb2 flrnw h3 ph3">
              {imageURL && (
                <div className="fln mr3" style={{ width: 64 }}>
                  <img src={imageURL} />
                </div>
              )}
              <div className="fla flcnw flspa">
                <div className="fln f7 f4-ns">
                  <span className="mulberry pr2">{speaker} -</span>
                  {name}
                  <span className="mulberry pl2">- {year}</span>
                </div>
                <div className="fln f5 f3-ns b ellipsis">{title}</div>
              </div>
              <div className="fln flcnw">
                <button
                  className="fln mba pointer bg-transparent bw0 black-50 f5"
                  aria-label="close"
                  onClick={onCloseDetail}
                >
                  close <span className="icon-close" />
                </button>
              </div>
            </div>

            <div className="flex flex-wrap flex-nowrap-l mb3 ph3">
              <div className="fln w-100 w-60-m w-60-l pr3">
                <YouTube
                  videoId={videoId}
                  opts={{
                    origin:
                      typeof window !== 'undefined'
                        ? window.location.origin
                        : 'https://talksearch-embed.algolia.com',
                    enablejsapi: '1',
                    // height: '390',
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
                <div className="mt3 lh-copy">{description}</div>
              </div>

              <div className="fln w-100 w-40-m w-40-l">
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
                    <div className="tc">
                      <Pagination showFirst={false} pagesPadding={0} />
                    </div>
                  </div>
                </InstantSearch>
              </div>
            </div>

            <div className="flrnw mb3 ph3">
              <div className="fla tl royal-blue b f4">
                <span className="dejavu black">{'< /> '}</span>
                embed this talk on your webpage
              </div>
              <div className="fla tr h1e">
                <img src="/img/search-by-algolia.svg" />
              </div>
            </div>

            <div className="bt b--black-30">
              <div className="pa3 flrnw">
                <div className="flex w-30 pr3">
                  <img src="/img/talksearch.svg" />
                </div>
                <div className="fln w-60 black-50 lh-copy f5">
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
          {/* todo: find what's wrong with z-index */}
          <button
            onClick={onCloseDetail}
            className="db vh-100 vw-100 w-100 o-30 z-max bn bg-black pointer"
          />
        </div>
      )
    );
  }
}
