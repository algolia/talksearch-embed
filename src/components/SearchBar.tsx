import { h, Component } from 'preact';
import { SearchBox, PoweredBy } from 'react-instantsearch/dom';

interface Props {
  name: string;
}
export default class SearchBar extends Component<Props, void> {
  render() {
    return (
      <div className="flex flex-wrap flex-nowrap-ns items-center ma2 mb3">
        <span className="ma3">{this.props.name}</span>
        <SearchBox />
        <div className="ma3">
          <PoweredBy />
        </div>
      </div>
    );
  }
}
