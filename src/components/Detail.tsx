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

import { SingleHit } from '../App';
import DetailHit from './DetailHit';

const VirtualMenu = connectMenu(() => null);
const RestrictToVideo = ({ videoId }: { videoId: string }) => (
  <VirtualMenu attributeName="videoId" defaultRefinement={videoId} />
);

interface Props {
  videoId: string;
  title: string;
  description: string;
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
    this.player.seekTo(this.props.start || 0);
  };

  render() {
    const {
      open,
      videoId,
      description,
      title,
      start = 0,
      onCloseDetail,
      indexName,
    } = this.props;
    return (
      open && (
        <div className="">
          <div className="absolute-center-horizontal z-max top-10 w-60 bg--white shadow-0 br6 ba pt3 bunting b--gray">
            <div className="mb2 flrnw h3 ph3">
              <div className="fln mr3">
                <img src="/img/writethedocs.png" />
              </div>
              <div className="fla flcnw flspa">
                {/* todo: use extracted values */}
                {/* <div className="fln f4">
                <span className="mulberry pr2">Tim Carry -</span>
                Write The Docs
                <span className="mulberry pl2">- 2017</span>
              </div> */}
                <div className="fln f3 b ellipsis">{title}</div>
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

            <div className="flrnw mb3 ph3">
              <div className="fln w-60 pr3">
                <YouTube
                  videoId={videoId}
                  opts={{
                    // todo: figure out on which domain we'll be
                    origin:
                      typeof window !== 'undefined'
                        ? window.location.origin
                        : 'https://talksearch.netlify.com',
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

              <div className="fln w-40">
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
                  </div>
                </InstantSearch>
              </div>
            </div>

            <div className="flrnw mb3 ph3">
              <div className="fla tl royal-blue b f4">
                <span className="dejavu black">{'< /> '}</span>
                embed this talk on your webpage
              </div>
              <div className="fla tr">
                <img src="/img/search-by-algolia.svg" />
              </div>
            </div>

            <div className="bt b--black-30">
              <div className="pa3 flrnw">
                <div className="fln w-30">
                  <img src="/img/talksearch.svg" />
                </div>
                <div className="fln w-60 black-50 lh-copy f5">
                  A tool to help conference organizers make all their videos
                  searchable & interactive.
                  <a href="#" className="link b royal-blue pl2">
                    Visit TalkSearch project
                  </a>
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={onCloseDetail}
            className="db vh-100 vw-100 w-100 o-0 pointer"
          />
        </div>
      )
    );
  }
}
