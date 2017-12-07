import { h, Component } from 'preact';

export type OnRefine = ({ tag }: { tag: string }) => void;
interface Props {
  tags: string[];
  onRefine: OnRefine;
}
export default class Tags extends Component<Props, void> {
  render() {
    const { tags = [], onRefine } = this.props;
    return (
      <div className="flex overflow-scroll f7">
        {tags.map(tag => (
          <button
            className="bn nowrap bg-logan fw3 ma1 pa1 br-pill pointer"
            onClick={() => onRefine({ tag })}
          >
            {tag}
          </button>
        ))}
      </div>
    );
  }
}
