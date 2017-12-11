import { h, Component } from 'preact';
import {
  InstantSearch,
  Hits,
  SearchBox,
  PoweredBy,
  Configure,
} from 'react-instantsearch/dom';
import { connectPagination } from 'react-instantsearch/connectors';
import * as algoliasearch from 'algoliasearch';
import { connectMenu } from 'react-instantsearch/connectors';
import YouTube from 'react-youtube';

import { SingleHit, Metadata } from '../App';
import DetailHit from './DetailHit';

const Pagination = connectPagination(
  ({ refine, currentRefinement, nbPages }) => {
    const hidePrevious = currentRefinement === 1;
    const hideNext = currentRefinement === nbPages;
    return (
      <div style={{ userSelect: 'none' }}>
        <button
          className={`${hidePrevious &&
            'o-10'} pointer bn bg-transparent bunting fw3`}
          onClick={() => refine(currentRefinement - 1)}
        >
          previous
        </button>
        {' • '}
        <button
          className={`${hideNext &&
            'o-10'} pointer bn bg-transparent bunting fw3`}
          onClick={() => refine(currentRefinement + 1)}
        >
          next
        </button>
      </div>
    );
  }
);

const VirtualMenu = connectMenu(() => null);
const RestrictToVideo = ({ id }: { id: string }) => (
  <VirtualMenu attributeName="id" defaultRefinement={id} />
);

const client = algoliasearch('FOQUAZ6YNS', '72ee3a317835b8618eda01c6fcc88f77');

interface State {
  title?: string;
  description?: string;
  speaker?: string;
  year?: number;
  singleVideo: boolean;
  showModal: boolean;
  metadata: Metadata;
}

interface Props {
  id: string;
  videoName: string | null;
  title: string;
  description: string;
  speaker: string;
  year: number;
  open: boolean;
  start?: number;
  onCloseDetail: () => void;
  indexName: string;
  metadata: Metadata;
  affiliation: boolean;
  autoplay: 0 | 1;
}
export default class Detail extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      singleVideo: this.props.videoName != null,
      showModal: false,
      metadata: props.metadata,
    };
  }

  componentWillReceiveProps(props) {
    const index = client.initIndex(props.indexName);

    index
      .search({
        filters: `id:${props.id}`,
        attributesToRetrieve: ['title', 'description', 'speaker', 'year'],
        attributesToHighlight: [],
        hitsPerPage: 1,
      })
      .then(({ hits: [hit] }) => {
        this.setState(hit);
      });
    if (props.metadata.avatar == null) {
      const meta = client.initIndex('METADATA');
      meta
        .getObject(props.indexName)
        .then(metadata => this.setState({ metadata }));
    }
  }
  player = null;
  onSeek = (time: number) => {
    this.player.seekTo(time);
  };
  onReady = e => {
    this.player = e.target;
    if (this.props.start) {
      this.player.seekTo(this.props.start);
    }
  };

  showEmbedModal = () =>
    this.setState(({ showModal }) => ({ showModal: !showModal }));

  render() {
    const {
      id,
      open,
      start = 0,
      onCloseDetail,
      indexName,
      affiliation,
      metadata: { name: _name, avatar: _avatar },
      autoplay
    } = this.props;
    const {
      title,
      description,
      speaker,
      year,
      singleVideo,
      showModal,
      metadata: { name: __name, avatar: __avatar },
    } = this.state;

    // todo: do this correctly
    const name = _name || __name || '';
    const avatar = _avatar || __avatar || '';

    return (
      open && (
        <div>
          <div className="w-100 bg-white pt1 pt3 bunting">
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
              {!singleVideo && (
                <div className="fln flcnw">
                  <button
                    className="fln mba pointer bg-transparent bw0 pa0"
                    onClick={onCloseDetail}
                  >
                    <span className="dn db-ns black-50 f5">
                      <span className="icon-caret-left" /> back to search
                    </span>
                    <span className="dn-ns db b bunting tr mt2">Back</span>
                  </button>
                </div>
              )}
            </div>

            <div className="flex flex-wrap flex-nowrap-l mb3 ph3-ns">
              <div className="fln w-100 w-60-m w-70-l pr3-ns">
                <YouTube
                  videoId={id}
                  opts={{
                    origin:
                      typeof window !== 'undefined'
                        ? window.location.origin
                        : 'https://talksearch-embed.algolia.com',
                    enablejsapi: 1,
                    width: '100%',
                    playerVars: {
                      autoplay,
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

              <div className="fln w-100 w-40-m w-30-l mt3 mt0-ns ph1 ph0-ns">
                <InstantSearch
                  appId="FOQUAZ6YNS"
                  apiKey="72ee3a317835b8618eda01c6fcc88f77"
                  indexName={`${indexName}-detail`}
                >
                  <RestrictToVideo id={id} />
                  <Configure
                    attributesToRetrieve={['title', 'start']}
                    attributesToSnippet={['text:15']}
                    attributesToHighlight={[]}
                    snippetEllipsisText="…"
                    hitsPerPage={7}
                  />
                  <SearchBox
                    translations={{
                      placeholder: 'Search in this video',
                    }}
                  />
                  <div className="mt2">
                    <Hits
                      hitComponent={({ hit }: { hit: SingleHit }) => (
                        <DetailHit hit={hit} onSeek={this.onSeek} />
                      )}
                    />
                    <div className="tc dn db-ns">
                      <Pagination />
                    </div>
                  </div>
                </InstantSearch>
              </div>
            </div>

            {affiliation && (
              <div>
                <div className="dn flex-ns flex-nowrap-ns mb3 ph3 dn db-ns">
                  <div className="fla tl royal-blue b f4 flrnw flrcv">
                    <div className="fln tl" >
                      <button onClick={this.showEmbedModal} className="bg-transparent bn bunting pointer">
                        <span className="dejavu black">{'< /> '}</span>
                        embed this talk on your webpage
                      </button>
                      {showModal && (
                        <span className="dejavu black">
                          <pre className="overflow-auto w-80">{`<iframe href="https://talksearch-embed.algolia.com/?i=${indexName}&video=${id}"/>`}</pre>
                        </span>)}
                    </div>
                  </div>
                  <div className="fln w-20 flc">
                    <a href="https://algolia.com" target="_blank">
                      <img src="/img/search-by-algolia.svg" />
                    </a>
                  </div>
                </div>

                <div className="dn flex-ns flex-nowrap b--black-30 pv3 ph5">
                  <div className="fla flrnw">
                    <div className="fln w-30 pr4 flrnw flrcv">
                      <a
                        href="https://community.algolia.com/talksearch"
                        target="_blank"
                      >
                        <img className="fln" src="/img/talksearch.svg" />
                      </a>
                    </div>
                    <div className="fln w-70 black-30 lh-copy f5 flc">
                      <div className="fla">
                        A tool to help conference organizers make all their
                        videos searchable & interactive.
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
            )}
          </div>
        </div>
      )
    );
  }
}
