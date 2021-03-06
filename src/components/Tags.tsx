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
      <div className="flex f7 mb3 flex-wrap">
        {tags.map(tag => (
          <button
            className="bn nowrap bunting o-70 bg-ghost mr1 ph2 pv1 lh-solid br-pill pointer mt1"
            onClick={() => onRefine({ tag })}
          >
            {tag}
          </button>
        ))}
      </div>
    );
  }
}
