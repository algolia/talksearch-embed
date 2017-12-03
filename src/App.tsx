import 'react-instantsearch-theme-algolia/style.min.css';
import './style.scss';

import { h, Component } from 'preact';
import {
  InstantSearch,
  Hits,
  SearchBox,
  PoweredBy,
  Configure,
} from 'react-instantsearch/dom';
import { connectStateResults } from 'react-instantsearch/connectors';

import MainHits from './components/MainHits';
import Detail from './components/Detail';

const RefinedSearch = connectStateResults(
  ({ children, searchState: { query = '' } }) => {
    try {
      // todo: add the other factors when relevant
      return children({ isRefined: query.length > 0 });
    } catch (_) {
      return children({ isRefined: false });
    }
  }
);

export interface SingleHit {
  videoId: string;
  start: number;
  videoThumbnails: { url: string };
  dur: string;
  text: string;
  videoTitle: string;
  videoDescription: string;
}

interface State {
  videoId: string;
  open: boolean;
}

interface Props {
  indexName: string;
}

export default class App extends Component<Props, State> {
  state = {
    videoId: '',
    open: false,
  };

  openDetail = (videoId: string) =>
    this.setState({
      videoId,
      open: true,
    });

  closeDetail = () =>
    this.setState({
      videoId: '',
      open: false,
    });

  render() {
    const { open, videoId } = this.state;
    const { indexName } = this.props;
    return (
      <div>
        <Detail
          open={open}
          videoId={videoId}
          onCloseDetail={this.closeDetail}
          indexName={indexName}
        />
        <InstantSearch
          appId="FOQUAZ6YNS"
          apiKey="72ee3a317835b8618eda01c6fcc88f77"
          indexName={indexName}
        >
          <RefinedSearch>
            {// todo: figure out why 0 doesn't apply
            isRefined => <Configure distinct={isRefined ? 1 : 1} />}
          </RefinedSearch>
          <SearchBox />
          <PoweredBy />
          <MainHits openDetail={this.openDetail} />
        </InstantSearch>
      </div>
    );
  }
}
