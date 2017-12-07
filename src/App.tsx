import 'react-instantsearch-theme-algolia/style.min.css';
import './style.scss';

import { h, Component } from 'preact';
import Helmet from 'preact-helmet';
import { InstantSearch, Configure, Stats } from 'react-instantsearch/dom';
import { connectStateResults } from 'react-instantsearch/connectors';

import MainHits from './components/MainHits';
import Detail from './components/Detail';
import SearchBar from './components/SearchBar';
import Refinement from './components/Refinement';
import { OnRefine } from './components/Tags';

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
export interface SingleHit {
  start: number;
  duration: number;
  year: number;
  speaker: string;
  text: string;
  videoId: string;
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
  _highlightResult: {
    text: HighlightMatch;
    description: HighlightMatch;
    title: HighlightMatch;
  };
  _distinctSeqID?: number;
}

export type OpenDetail = (
  {
    videoId,
    title,
    description,
    speaker,
    year,
    start,
  }: {
    videoId: string;
    title: string;
    description: string;
    speaker: string;
    year: number;
    start?: number;
  }
) => void;

interface State {
  videoId: string;
  start: number;
  title: string;
  description: string;
  speaker: string;
  year: number;
  open: boolean;
  defaultRefinements: {
    tags: string[];
  };
}

const defaultState = {
  videoId: '',
  start: 0,
  title: '',
  description: '',
  speaker: '',
  year: 2017,
  open: false,
  defaultRefinements: {
    tags: [],
  },
};

export interface Metadata {
  objectID: string;
  name: string;
  youtubeURL: string;
  avatar: string;
  accentColor?: string;
}
interface Props {
  indexName: string;
  metadata: Metadata;
}
export default class App extends Component<Props, State> {
  state = defaultState;

  openDetail: OpenDetail = ({
    videoId,
    title,
    description,
    start,
    speaker,
    year,
  }) =>
    this.setState({
      videoId,
      title,
      description,
      speaker,
      year,
      start,
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
      videoId: '',
      start: 0,
      description: '',
      title: '',
      open: false,
      defaultRefinements: { tags: [] },
    });

  render() {
    const {
      open,
      videoId,
      start,
      description,
      title,
      speaker,
      year,
      defaultRefinements: { tags = [] },
    } = this.state;
    const { indexName, metadata: { name } } = this.props;
    return (
      <div className="montserrat ma0">
        <Helmet
          htmlAttributes={{ lang: 'en' }}
          link={[
            {
              rel: 'stylesheet',
              href:
                'https://unpkg.com/@haroenv/tachyons-algolia/tachyons-algolia.min.css',
            },
          ]}
          title={`${open ? title : name} | TalkSearch`}
        />
        <Detail
          open={open}
          videoId={videoId}
          title={title}
          description={description}
          year={year}
          speaker={speaker}
          start={start}
          onCloseDetail={this.closeDetail}
          indexName={indexName}
          metadata={this.props.metadata}
        />

        {!open && (
          <InstantSearch
            appId="FOQUAZ6YNS"
            apiKey="72ee3a317835b8618eda01c6fcc88f77"
            indexName={indexName}
          >
            <RefinedSearch>
              {({ hasQuery }) => (
                <Configure
                  distinct={hasQuery ? 3 : 0}
                  attributesToSnippet={['description:30']}
                  hitsPerPage={10}
                  snippetEllipsisText="…"
                />
              )}
            </RefinedSearch>
            <SearchBar name={name} />
            <div className="mb2 ml2 dn db-l">
              <Stats />
            </div>
            <div className="flex flex-nowrap flex-column flex-row-40">
              <div className="mb4 mb0-l mr4-l shadow-0 shadow-none-40 fln w-30-40 w-20-l pa2-40">
                <Refinement attribute="tags" defaultRefinement={tags} />
                <Refinement attribute="year" />
              </div>
              <div className="fln w-70-40 w-80-l pa2-40">
                <MainHits openDetail={this.openDetail} />
              </div>
            </div>
          </InstantSearch>
        )}
      </div>
    );
  }
}
