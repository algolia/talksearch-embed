import 'react-instantsearch-theme-algolia/style.min.css';
import './style.scss';

import { h, Component } from 'preact';
import Helmet from 'preact-helmet';
import { InstantSearch, Configure, Stats } from 'react-instantsearch/dom';
import { connectStateResults } from 'react-instantsearch/connectors';
import algoliasearch from 'algoliasearch/lite';

import MainHits from './components/MainHits';
import Detail from './components/Detail';
import SearchBar from './components/SearchBar';
import Refinement from './components/Refinement';
import { OnRefine } from './components/Tags';

const client = algoliasearch('FOQUAZ6YNS', '72ee3a317835b8618eda01c6fcc88f77');
const meta = client.initIndex('METADATA');

const RefinedSearch = connectStateResults(
  ({ children, searchState: { query = '' } }) => {
    try {
      return children({ hasQuery: query.length > 0 });
    } catch (_) {
      return children({ hasQuery: false });
    }
  }
);

export interface HighlightMatch {
  value: string;
  matchLevel: 'none' | 'partial' | 'full';
  matchedWords: string[];
}
export interface SnippetMatch {
  value: string;
  matchLevel: 'none' | 'partial' | 'full';
}

export interface SingleHit {
  start: number;
  duration: number;
  year: number;
  speaker: string;
  text: string;
  id: string;
  title: string;
  description: string;
  tags: string[];
  thumbnails: {
    url: string;
    width: number;
    height: number;
  };
  ranking: number;
  channel: string;
  objectID: string;
  indexName?: string;
  _highlightResult: {
    text: HighlightMatch;
    description: HighlightMatch;
    title: HighlightMatch;
  };
  _snippetResult: {
    text: SnippetMatch;
    description: SnippetMatch;
  };
  _distinctSeqID?: number;
}

export type OpenDetail = (
  {
    id,
    title,
    description,
    speaker,
    year,
    start,
    indexName,
  }: {
    id: string;
    title: string;
    description: string;
    speaker: string;
    year: number;
    start?: number;
    indexName: string;
  }
) => void;

interface State {
  id: string;
  start: number;
  title: string;
  description: string;
  speaker: string;
  year: number;
  open: boolean;
  indexName: string | undefined;
  defaultRefinements: {
    tags: string[];
  };
  metadata?: Metadata;
}
export interface Metadata {
  objectID: string;
  name: string;
  youtubeURL: string;
  avatar: string;
  accentColor?: string;
}
const defaultState = {
  id: '',
  start: 0,
  title: '',
  description: '',
  speaker: '',
  year: 2017,
  open: false,
  indexName: undefined,
  defaultRefinements: {
    tags: [],
  },
  metadata: undefined,
};

interface Props {
  indexName: string;
  videoName: string | undefined;
  affiliation: boolean;
  autoplay: boolean;
  accentEnabled: boolean;
}
export default class App extends Component<Props, State> {
  state = defaultState;

  openDetail: OpenDetail = ({
    id,
    title,
    description,
    start,
    speaker,
    year,
    indexName,
  }) =>
    this.setState({
      id,
      title,
      description,
      speaker,
      year,
      start,
      indexName,
      open: true,
    });

  onRefine: OnRefine = ({ tag }) =>
    this.setState(({ defaultRefinements }) => {
      const tags = new Set(defaultRefinements.tags);
      // toggle the tag
      if (tags.has(tag)) {
        tags.delete(tag);
      } else {
        tags.add(tag);
      }
      return {
        defaultRefinements: {
          ...defaultRefinements,
          tags: Array.from(tags),
        },
      };
    });

  closeDetail = () =>
    this.setState({
      id: '',
      start: 0,
      description: '',
      title: '',
      open: false,
      defaultRefinements: { tags: [] },
    });

  componentDidMount() {
    const { indexName, accentEnabled } = this.props;
    if (indexName && indexName !== 'ALL_VIDEOS') {
      meta.getObject(indexName).then(metadata => {
        if (metadata.accentColor && accentEnabled) {
          document.body.style.setProperty('--color', metadata.accentColor);
        }

        this.setState({
          metadata,
        });
      });
    }
  }

  render() {
    const {
      open: detailOpen,
      id,
      start,
      description,
      title,
      speaker,
      year,
      defaultRefinements: { tags = [] },
      indexName: stateIndex,
      metadata,
    } = this.state;
    const { indexName, videoName, affiliation } = this.props;
    const open = detailOpen || Boolean(videoName);
    const name = metadata ? metadata.name || '' : '';

    // todo: get rid of ugly conditional in `title`
    return (
      <div className="ma0">
        <Helmet
          htmlAttributes={{ lang: 'en' }}
          link={[
            {
              rel: 'stylesheet',
              href:
                'https://unpkg.com/@haroenv/tachyons-algolia/tachyons-algolia.min.css',
            },
          ]}
          title={`${open ? title || name : name || ''}${(title || name || '') &&
            ' | '}TalkSearch`}
        />
        <Detail
          open={open}
          id={id || videoName}
          videoName={videoName}
          start={start}
          onCloseDetail={this.closeDetail}
          indexName={stateIndex || indexName}
          title={title}
          description={description}
          year={year}
          speaker={speaker}
          metadata={this.state.metadata}
          affiliation={affiliation}
          autoplay={this.props.autoplay ? 1 : 0}
        />
        <div hidden={open}>
          <InstantSearch
            appId="FOQUAZ6YNS"
            apiKey="72ee3a317835b8618eda01c6fcc88f77"
            indexName={indexName}
          >
            <RefinedSearch>
              {({ hasQuery }) => (
                <Configure
                  distinct={hasQuery ? 3 : 1}
                  attributesToSnippet={['description:30', 'text:10']}
                  attributesToHighlight={['speaker', 'title', 'description']}
                  hitsPerPage={10}
                  snippetEllipsisText="…"
                />
              )}
            </RefinedSearch>
            <div className="w-100 w-80-l center mt4-l">
              <SearchBar name={name} />
              <div className="mb2 ml2 dn db-l">
                <Stats />
              </div>
            </div>

            <div className="flex flex-nowrap flex-column flex-row-40 w-100 pa2 ph4-l">
              <div className="mb4 mb0-l fln w-30-40 w-20-60">
                <Refinement attribute="tags" defaultRefinement={tags} />
                <Refinement
                  attribute="year"
                  withSearchBox={false}
                  responsive={false}
                />
                <Refinement
                  attribute="speaker"
                  withSearchBox={false}
                  responsive={false}
                />
                {indexName === 'ALL_VIDEOS' && (
                  <Refinement
                    attribute="channel"
                    withSearchBox={false}
                    responsive={false}
                  />
                )}
              </div>
              <div className="fln w-70-40 w-80-60">
                <MainHits
                  openDetail={this.openDetail}
                  onRefine={this.onRefine}
                />
              </div>
            </div>
          </InstantSearch>
        </div>
      </div>
    );
  }
}
